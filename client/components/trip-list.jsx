import React from 'react';

function Trip(props) {
  const { destination, icon, startDate, endDate } = props.trip;
  return (
      <div className="list-container flex">
        <div className="col-one-third flex justify-end align-center">
          <img className="icon-image" src={icon}></img>
        </div>
        <div className="col-two-third flex flex-column justify-center trip-list-padding">
          <div className="row">
            <h3 className="trip-list">Trip to {destination}</h3>
          </div>
          <div className="row">
            <p className="trip-list">{startDate} - {endDate}</p>
          </div>
        </div>
      </div>

  );
}

function TripList(props) {
  return (
    <div className="body-container">
      <div className="row header-margin">
        <h2>My Trips</h2>
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
