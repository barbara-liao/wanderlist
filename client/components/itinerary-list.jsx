import React from 'react';
import getRange from '../lib/get-range';
import parseAddress from '../lib/parse-address';
import parseDate from '../lib/parse-date';
import parseTime from '../lib/parse-time';

function Itinerary(props) {
  const itinerary = props.itinerary;
  const { name, timeStart, timeEnd, address } = itinerary;
  return (
    <>
      <div className="row itinerary-card justify-space-between day-margin">
        <div className="col-nine-tenth flex flex-column justify-center padding-left">
          <div className="row">
            <h4 className="itinerary-margin">{name}</h4>
          </div>
          <div className="row">
            <p className="itinerary-margin itinerary-font">{parseTime(timeStart)} - {parseTime(timeEnd)}</p>
          </div>
          <div className="row">
            <p className="itinerary-margin itinerary-font">{parseAddress(address)}</p>
          </div>
        </div>
        <div className="col-one-tenth flex justify-center align-center">
          <a>
            <i className="fas fa-ellipsis-v"></i>
          </a>
        </div>
      </div>
    </>
  );
}

function Day(props) {
  const date = props.day;
  const itineraries = props.itineraries;
  if (itineraries === null) { return null; }
  return (
    <>
      <div className="row flex-column">
        <h3 className="margin-none day-font">{date.dayNum}: {date.date}</h3>
        <hr className="margin-none flex align-center bottom-margin"></hr>
      </div>
      {
        itineraries.map(itinerary => {
          const itineraryDate = parseDate(itinerary.date);
          if (date.date === itineraryDate) {
            return (
              <Itinerary key={itinerary.placeId} itinerary={itinerary} />
            );
          } else { return null; }
        })
      }
    </>
  );
}

function ItineraryList(props) {
  const { startDate, endDate } = props.trips.trip;
  const { itineraries } = props.trips;
  const dates = getRange(startDate, endDate);

  return (
    <>
    {
      dates.map(day => {
        return (
          <div key={day.date} className="itinerary-container">
          <Day itineraries={itineraries} day={day} />
          </div>
        );
      })
    }
    </>
  );
}

export default ItineraryList;
