import React from 'react';
import getRange from '../lib/get-range';

function Day(props) {
  const date = props.day;
  return (
    <>
      <div className="row flex-column day-margin">
        <h3 className="margin-none day-font">{date.dayNum}: {date.date}</h3>
        <hr className="margin-none flex align-center"></hr>
      </div>
    </>
  );
}

function ItineraryList(props) {
  const { startDate, endDate } = props.trips.trip;
  const dates = getRange(startDate, endDate);

  return (
    <>
    {
      dates.map(day => {
        return (
          <div key={day.date} className="itinerary-container">
          <Day day={day} />
          </div>
        );
      })
    }
    </>
  );
}

export default ItineraryList;