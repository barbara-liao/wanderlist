import React from 'react';
import Autocomplete from './autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import AppContext from '../lib/app-context';

export class AddItineraryForm extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      adrAddress: '',
      address: '',
      date: '',
      endTime: '',
      geometry: '',
      hours: [],
      name: '',
      numOfRatings: null,
      phoneNum: '',
      placeId: '',
      rating: null,
      startTime: '',
      tripId: props.tripId,
      website: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
  }

  handleSelect(address, placeId) {
    this.setState({
      address,
      placeId
    });

    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('user-jwt')
      }
    };

    fetch(`/api/places/${placeId}`, req)
      .then(response => response.json())
      .then(result => {
        const { name, rating, website } = result.result;
        const phoneNum = result.result.formatted_phone_number;
        const hours = result.result.opening_hours.weekday_text;
        const numOfRatings = result.result.user_ratings_total;
        const adrAddress = result.result.adr_address;
        const geometry = result.result.geometry.location;
        this.setState({
          placeId,
          address,
          geometry,
          name,
          rating,
          website,
          phoneNum,
          hours,
          numOfRatings,
          adrAddress
        });
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleAutocompleteChange(event) {
    this.setState({ address: event });
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('user-jwt')
      },
      body: JSON.stringify(this.state)
    };
    fetch('api/itinerary', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = `#trip-itinerary?tripId=${this.state.tripId}`;
      });

    form.reset();
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="row flex-column">
            <label htmlFor="destination">
              Search Places
            </label>
            <Autocomplete onChange={this.handleAutocompleteChange} onSelect={this.handleSelect} name="address" address={this.state.address} />
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
              onChange={this.handleChange}
              className="itinerary-input poppins">
            </input>
          </div>
          <div className="row justify-space-between header-margin">
            <a className="cancel-button flex justify-center align-center" href={`#trip-itinerary?tripId=${this.props.tripId}`}>Cancel</a>
            <button className="add-save-button poppins">Add</button>
          </div>
        </form>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_API_KEY)
})(AddItineraryForm);

AddItineraryForm.contextType = AppContext;
