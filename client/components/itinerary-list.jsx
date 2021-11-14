import React from 'react';
import getRange from '../lib/get-range';
import parseAddress from '../lib/parse-address';
import parseDate from '../lib/parse-date';
import parseOperatingHours from '../lib/parse-operating-hours';
import parseTime from '../lib/parse-time';

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleBlur(event) {
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('user-jwt')
      },
      body: JSON.stringify(this.state)
    };
    fetch(`api/itinerary/${event.target.id}`, req)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  render() {
    const { tripId, itemSelectedId, itemViewed, itinerary, itineraryId } = this.props;
    const { name, timeStart, timeEnd, address, rating, userRatingsTotal, hours, website, phoneNumber } = itinerary;
    const notes = this.state.notes;
    const parsedHours = parseOperatingHours(hours);
    const formattedRatingsNum = Number(parseFloat(userRatingsTotal)).toLocaleString('en');
    return (
      <>
        <div className="row itinerary-card flex-column day-margin">
          <div onClick={this.props.onClick} className="row itinerary-header justify-space-between">
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
              <a id="edit-delete" onClick={this.props.onClick}>
                <i id={itineraryId} className="fas fa-ellipsis-v ellipses-padding"></i>
              </a>
              <div className={itemSelectedId === itineraryId
                ? 'edit-delete-modal flex flex-column justify-center position-absolute position'
                : 'edit-delete-modal flex flex-column justify-center position-absolute position hidden'}>
              <a onClick={this.props.onClick}
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
              <textarea
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                id={itineraryId}
                name="notes"
                value={ notes || ''}
                className="note-input poppins"
                placeholder="Add notes here...">
              </textarea>
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
                <a className="margin-none itinerary-font" href={website} target="_blank" rel="noreferrer">{website}</a>
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
              <Itinerary onClick={props.onClick} itineraryId={itinerary.itineraryId} key={itinerary.placeId} notes={itinerary.notes}
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
