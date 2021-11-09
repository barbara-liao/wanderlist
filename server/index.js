require('dotenv/config');
const fetch = require('node-fetch');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

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

app.get('/api/trip', (req, res, next) => {
  const sql = `
  select *
  from "trip"
  order by "startDate"`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => { next(err); });
});

app.get('/api/places/:id', (req, res, next) => {
  const ApiKey = process.env.REACT_APP_GOOGLE_KEY;
  const placeId = req.params.id;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name%2Cadr_address%2Crating%2Cuser_ratings_total%2Cwebsite%2Copening_hours%2Cformatted_phone_number&key=${ApiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(err => console.error(err));
});

app.get('/api/trip/:tripId', (req, res, next) => {
  const tripId = parseInt(req.params.tripId, 10);
  if (!tripId) {
    throw new ClientError(400, 'tripId must be a positive integer');
  }
  const sql = `
  select *
  from "trip"
  where "tripId" = $1`;

  const params = [tripId];

  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find trip with tripId ${tripId}`);
      }
      res.json(result.rows[0]);
    });
});

app.post('/api/trip', (req, res, next) => {
  const { destination, startDate, endDate, icon } = req.body;
  if (!destination || !startDate || !endDate || !icon) {
    throw new ClientError(400, 'destination, startdate, enddate and icon are required fields');
  }
  const sql = `
  insert into "trip" ("destination", "startDate", "endDate", "icon", "userId")
  values ($1, $2, $3, $4, 1)
  returning *`;

  const params = [destination, startDate, endDate, icon];

  db.query(sql, params)
    .then(result => {
      const newTrip = result.rows[0];
      res.status(201).json(newTrip);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
