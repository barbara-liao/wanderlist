require('dotenv/config');
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
