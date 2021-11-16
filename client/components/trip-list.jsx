import React from 'react';
import parseDate from '../lib/parse-date';

function Trip(props) {
  const { destination, icon, startDate, endDate, tripId } = props.trip;
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  return (
    <a id={tripId} href={`#trip-itinerary?tripId=${tripId}`}>
      <div className="list-container flex">
        <div className="col-one-third flex justify-end align-center">
          <img className="icon-image" src={icon}></img>
        </div>
        <div className="col-two-third flex flex-column justify-center trip-list-padding">
          <div className="row destination">
            <h3 className="trip-list color-black">Trip to {destination}</h3>
          </div>
          <div className="row date-range">
            <p className="trip-list color-black">{start} - {end}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

function TripList(props) {
  return (
    <>
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
    </>
  );
}

export default TripList;
