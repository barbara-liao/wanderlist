import React from 'react';
import getRange from '../lib/get-range';
import parseAddress from '../lib/parse-address';
import parseDate from '../lib/parse-date';
import parseOperatingHours from '../lib/parse-operating-hours';
import parseTime from '../lib/parse-time';

function Itinerary(props) {
  const { tripId, itemSelectedId, itemViewed, itinerary, itineraryId } = props;
  const { name, timeStart, timeEnd, address, rating, userRatingsTotal, hours, website, phoneNumber } = itinerary;
  const parsedHours = parseOperatingHours(hours);
  const formattedRatingsNum = Number(parseFloat(userRatingsTotal)).toLocaleString('en');
  return (
      <>
        <div className="row itinerary-card flex-column day-margin">
          <div onClick={props.onClick} className="row itinerary-header justify-space-between">
            <a id="display" className="col-nine-tenth margin-auto">
              <div id={itineraryId} className="flex flex-column justify-center padding-left">
                <div id={itineraryId} className="row">
                  <h4 id={itineraryId} className="itinerary-margin">{name}</h4>
                </div>
                <div id={itineraryId} className="row">
                  <p id={itineraryId}className="itinerary-margin itinerary-font">{parseTime(timeStart)} - {parseTime(timeEnd)}</p>
                </div>
                <div id={itineraryId} className="row">
                <p id={itineraryId} className="itinerary-margin itinerary-font">{parseAddress(address)}</p>
                </div>
              </div>
            </a>
            <div className="col-one-tenth flex justify-center align-center position-relative">
              <a id="edit-delete" onClick={props.onClick}>
                <i id={itineraryId} className="fas fa-ellipsis-v ellipses-padding"></i>
              </a>
              <div className={itemSelectedId === itineraryId
                ? 'edit-delete-modal flex flex-column justify-center position-absolute position'
                : 'edit-delete-modal flex flex-column justify-center position-absolute position hidden'}>
              <a onClick={props.onClick}
                 href={`#edit-trip?tripId=${tripId}&itineraryId=${itineraryId}`}
                 id="edit"
                 className="itinerary-margin itinerary-font modal-padding hover color-black">
                   Edit
              </a>
                <a id="remove" className="itinerary-margin itinerary-font modal-padding hover color-black">Remove</a>
              </div>
            </div>
          </div>
          <div className={itemViewed === itineraryId ? 'itinerary-body padding-left' : 'itinerary-body padding-left hidden'}>
            <div className="row title-margin">
              <p className="margin-none">Add notes here...</p>
            </div>
              { rating && (
                <div className="row title-margin">
                  <i className="fas fa-star star-detail icon-margin"></i>
                  <div className="row">
                    <p className="rating-margin itinerary-font font-bold">{rating}</p>
                    <p className="margin-none itinerary-font font-bold">({formattedRatingsNum})</p>
                  </div>
                </div>
              )}
            <div className="row title-margin">
              <i className="fas fa-clock icon-detail icon-margin"></i>
              <div>
                {
                  parsedHours.map(hour => {
                    return (
                      <p key={hour} className="margin-none itinerary-font">{hour}</p>
                    );
                  })
                }
              </div>
            </div>
            { website && (
            <div className="row title-margin">
              <i className="fas fa-globe-americas icon-detail icon-margin"></i>
              <div className="row">
                <a className="margin-none itinerary-font" href={website}>{website}</a>
              </div>
            </div>
            )}
            { phoneNumber && (
            <div className="row title-margin">
              <i className="fas fa-phone icon-detail icon-margin"></i>
              <div className="row">
                <a className="margin-none itinerary-font" href={`tel:${phoneNumber}`}>{phoneNumber}</a>
              </div>
            </div>
            )}
          </div>
        </div>
      </>
  );
}

function Day(props) {
  const date = props.day;
  const { itemSelected, itemSelectedId, itemViewed, tripId } = props;
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
              <Itinerary onClick={props.onClick} itineraryId={itinerary.itineraryId} key={itinerary.placeId}
                itemSelected={itemSelected} itemSelectedId={itemSelectedId} itemViewed={itemViewed} tripId={tripId} itinerary={itinerary} />
            );
          } else { return null; }
        })
      }
    </>
  );
}

function ItineraryList(props) {
  const { itemSelected, itemSelectedId, itemViewed, tripId } = props.trips;
  const { startDate, endDate } = props.trips.trip;
  const { itineraries } = props.trips;
  const dates = getRange(startDate, endDate);

  return (
    <>
    {
      dates.map(day => {
        return (
          <div key={day.date} className="itinerary-container">
          <Day onClick={props.onClick} itineraries={itineraries} itemSelected={itemSelected}
          itemSelectedId={itemSelectedId} itemViewed={itemViewed} tripId={tripId} day={day} />
          </div>
        );
      })
    }
    </>
  );
}

export default ItineraryList;
