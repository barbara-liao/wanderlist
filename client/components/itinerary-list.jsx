import React from 'react';
import getRange from '../lib/get-range';
import parseAddress from '../lib/parse-address';
import parseDate from '../lib/parse-date';
import parseOperatingHours from '../lib/parse-operating-hours';
import parseTime from '../lib/parse-time';

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemViewed: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const id = event.target.id;
    if (event.target.nodeName !== 'I') {
      if (this.state.itemViewed === Number(id)) {
        this.setState({
          itemViewed: null
        });
      } else {
        this.setState({
          itemViewed: Number(id)
        });
      }
    }
  }

  render() {
    const itinerary = this.props.itinerary;
    const { name, timeStart, timeEnd, address, rating, userRatingsTotal, hours, website, phoneNumber } = itinerary;
    const itineraryId = this.props.itineraryId;
    const parsedHours = parseOperatingHours(hours);
    const formattedRatingsNum = Number(parseFloat(userRatingsTotal)).toLocaleString('en');
    return (
      <>
        <div className="row itinerary-card flex-column day-margin">
          <a>
            <div onClick={this.handleClick} className="row itinerary-header justify-space-between">
              <div id={itineraryId} className="col-nine-tenth flex flex-column justify-center padding-left">
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
              <div className="col-one-tenth flex justify-center align-center">
                <i id={itineraryId} className="fas fa-ellipsis-v ellipses-padding"></i>
              </div>
            </div>
          </a>
          <div className={this.state.itemViewed === itineraryId ? 'itinerary-body padding-left' : 'itinerary-body padding-left hidden'}>
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
                <p className="margin-none itinerary-font">{website}</p>
              </div>
            </div>
            )}
            { website && (
            <div className="row title-margin">
              <i className="fas fa-phone icon-detail icon-margin"></i>
              <div className="row">
                <p className="margin-none itinerary-font">{phoneNumber}</p>
              </div>
            </div>
            )}
          </div>
        </div>
      </>
    );
  }
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
              <Itinerary itineraryId={itinerary.itineraryId} key={itinerary.placeId} itinerary={itinerary} />
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
