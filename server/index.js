require('dotenv/config');
const fetch = require('node-fetch');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.post('/api/auth/register', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/trips', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "trip"
      where "userId" = $1
    order by "startDate"`;

  const param = [userId];
  db.query(sql, param)
    .then(result => res.json(result.rows))
    .catch(err => { next(err); });
});

app.get('/api/places/:id', (req, res, next) => {
  const ApiKey = process.env.GOOGLE_MAPS_API_KEY_BACKEND;
  const placeId = req.params.id;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name%2Cadr_address%2Crating%2Cuser_ratings_total%2Cwebsite%2Cgeometry%2Copening_hours%2Cformatted_phone_number&key=${ApiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(err => next(err));
});

app.get('/api/trip/:tripId', authorizationMiddleware, (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { userId } = req.user;
  if (!tripId) {
    throw new ClientError(400, 'tripId must be a positive integer');
  }
  const sql = `
    select *
      from "trip"
     where "tripId" = $1 and
           "userId" = $2`;

  const params = [tripId, userId];

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find trip with tripId ${tripId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/trip/:tripId/itinerary', authorizationMiddleware, (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  const { userId } = req.user;
  if (!tripId) {
    throw new ClientError(400, `cannot find trip with tripId ${tripId}`);
  }
  const sql = `
    select *
     from "itinerary"
    where "tripId" = $1 and
          "userId" = $2
    order by "timeStart"`;

  const params = [tripId, userId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/itinerary/:itineraryId', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const itineraryId = parseInt(req.params.itineraryId, 10);
  if (!itineraryId) {
    throw new ClientError(400, `cannot find trip with itineraryId ${itineraryId}`);
  }

  const sql = `
    select "name", "date", "timeStart", "timeEnd"
      from "itinerary"
     where "itineraryId" = $1 and
           "userId" = $2`;

  const params = [itineraryId, userId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/trip', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { destination, startDate, endDate, icon } = req.body;
  if (!destination || !startDate || !endDate || !icon) {
    throw new ClientError(400, 'destination, startdate, enddate and icon are required fields');
  }
  const sql = `
    insert into "trip" ("destination", "startDate", "endDate", "icon", "userId")
        values ($1, $2, $3, $4, $5)
    returning *`;

  const params = [destination, startDate, endDate, icon, userId];

  db.query(sql, params)
    .then(result => {
      const newTrip = result.rows[0];
      res.status(201).json(newTrip);
    })
    .catch(err => next(err));
});

app.post('/api/itinerary', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { adrAddress, address, date, endTime, geometry, hours, name, numOfRatings, phoneNum, placeId, rating, startTime, tripId, website } = req.body;
  if (!date || !endTime || !startTime || !address) {
    throw new ClientError(400, 'date, starttime, endtime and place are required fields');
  }
  const sql = `
    insert into "itinerary" ("address", "date", "hours", "name", "userRatingsTotal", "phoneNumber", "placeId", "rating", "timeEnd", "timeStart", "tripId", "website", "geometry", "userId")
        values ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    returning *`;

  const params = [adrAddress, date, hours, name, numOfRatings, phoneNum, placeId, rating, endTime, startTime, tripId, website, geometry, userId];

  db.query(sql, params)
    .then(result => {
      const itinerary = result.rows[0];
      res.status(201).json(itinerary);
    })
    .catch(err => next(err));
});

app.patch('/api/itinerary/:itineraryId', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const itineraryId = parseInt(req.params.itineraryId, 10);
  const { notes } = req.body;
  const sql = `
    update "itinerary"
    set "notes" = $1
    where "itineraryId" = $2 and
          "userId" = $3
    returning *`;

  const params = [notes, itineraryId, userId];

  db.query(sql, params)
    .then(result => {
      const notes = result.rows[0];
      res.status(201).json(notes);
    })
    .catch(err => next(err));
});

app.patch('/api/itinerary', authorizationMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { endTime, startTime, date, itineraryId } = req.body;
  if (!date || !endTime || !startTime || !itineraryId) {
    throw new ClientError(400, 'date, starttime, endtime and place are required fields');
  }
  const sql = `
    update "itinerary"
       set "date" = $1,
           "timeStart" = $2,
           "timeEnd" = $3
     where "itineraryId" = $4 and
           "userId" = $5
     returning *`;

  const params = [date, startTime, endTime, itineraryId, userId];

  db.query(sql, params)
    .then(result => {
      const updatedItinerary = result.rows[0];
      res.status(201).json(updatedItinerary);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
