import React from 'react';
import Autocomplete from './autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
// import { geocodeByPlaceId } from 'react-places-autocomplete';

export class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      startTime: '',
      endTime: '',
      address: '',
      placeId: '',
      details: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('hello');

    // const form = event.target;
    // console.log(form);
    // const req = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // };
    // fetch('api/itinerary', req)
    //   .then(res => res.json())
    //   .then(result => {
    //     window.location.hash = '#trips';
    //     this.setState({
    //       modalOpen: false,
    //       selectedIcon: 'icons/icon-placeholder.svg',
    //       icon: 'icons/icon-placeholder.svg',
    //       destination: '',
    //       startDate: '',
    //       endDate: ''
    //     });
    //   });

    // form.reset();
  }

  handleSelect(address, placeId) {
    this.setState({
      address,
      placeId
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleAutocompleteChange(event) {
    this.setState({ address: event });
  }

  render() {
    // console.log(this.state);
    return (
      <>
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
          <button onClick={this.handleSubmit} className="add-save-button poppins">Add</button>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyADlDyACi5WP6xynptx0Au3ZXC1xhzBTRg')
})(Itinerary);
