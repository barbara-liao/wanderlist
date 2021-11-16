import React from 'react';
import { defaultDate } from '../lib/default-date';
import { defaultTime } from '../lib/default-time';

export default class EditItineraryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      endTime: null,
      itemSelected: null,
      itemSelectedId: null,
      itineraryId: props.itineraryId,
      startTime: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const itineraryId = this.props.itineraryId;
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('user-jwt')
      }
    };
    fetch(`/api/itinerary/${itineraryId}`, req)
      .then(response => response.json())
      .then(itinerary => {
        this.setState({
          date: itinerary.date,
          endTime: itinerary.timeEnd,
          itemSelected: itinerary,
          itemSelectedId: Number(itineraryId),
          startTime: itinerary.timeStart
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('user-jwt')
      },
      body: JSON.stringify(this.state)
    };
    
    fetch('/api/itinerary/', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = `#trip-itinerary?tripId=${this.props.tripId}`;
      });

    form.reset();
  }

  render() {
    if (!this.state.itemSelected) { return null; }
    const { name, date, timeStart, timeEnd } = this.state.itemSelected;
    const formattedDate = defaultDate(date);
    const formattedStartTime = defaultTime(timeStart);
    const formattedEndTime = defaultTime(timeEnd);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="row flex-column">
            <div>
              <h4 className="day-margin">{name}</h4>
            </div>
          </div>
          <div className="row flex-column day-margin">
            <label htmlFor="destination">
              Date
            </label>
            <input
              required
              id="date"
              type="date"
              name="date"
              defaultValue={formattedDate}
              onChange={this.handleChange}
              className="itinerary-input poppins">
            </input>
          </div>
          <div className="row flex-column day-margin">
            <label htmlFor="destination">
              Start Time
            </label>
            <input
              required
              id="startTime"
              type="time"
              name="startTime"
              defaultValue={formattedStartTime}
              onChange={this.handleChange}
              className="itinerary-input poppins">
            </input>
          </div>
          <div className="row flex-column day-margin">
            <label htmlFor="destination">
              End Time
            </label>
            <input
              required
              id="endTime"
              type="time"
              name="endTime"
              defaultValue={formattedEndTime}
              onChange={this.handleChange}
              className="itinerary-input poppins">
            </input>
          </div>
          <div className="row justify-space-between header-margin">
            <a className="cancel-button flex justify-center align-center" href={`#trip-itinerary?tripId=${this.props.tripId}`}>Cancel</a>
            <button className="add-save-button poppins">Save</button>
          </div>
        </form>
      </>
    );
  }
}
