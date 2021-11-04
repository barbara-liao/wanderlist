import React from 'react';
import parseDate from '../lib/parse-date';

function Trip(props) {
  const { destination, icon, startDate, endDate } = props.trip;
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return (
      <div className="list-container flex">
        <div className="col-one-third flex justify-end align-center">
          <img className="icon-image" src={icon}></img>
        </div>
        <div className="col-two-third flex flex-column justify-center trip-list-padding">
          <div className="row destination">
            <h3 className="trip-list">Trip to {destination}</h3>
          </div>
          <div className="row date-range">
            <p className="trip-list">{start} - {end}</p>
          </div>
        </div>
      </div>
  );
}

function TripList(props) {
  return (
    <div className="body-container">
      <div className="row header-margin justify-space-between align-center">
        <h2>My Trips</h2>
        <a className="new-trip-button flex justify-center align-center poppins" href="#">New Trip</a>
      </div>
      {
        props.trips.map(trip => {
          return (
            <Trip
            key={trip.tripId}
            trip={trip}
            />
          );
        })
      }
    </div>
  );
}

export default TripList;
