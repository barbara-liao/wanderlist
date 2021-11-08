import React from 'react';
import Autocomplete from './autocomplete';

export default class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      date: '',
      startTime: '',
      endTime: '',
      details: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('hello');

    const search = this.state.search.replaceAll(' ', '%20');
    // console.log(search);

    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json
    ?input=${search}
    &inputtype=textquery
    &fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry%2Cplace_id%2Cuser_ratings_total
    &key=AIzaSyADlDyACi5WP6xynptx0Au3ZXC1xhzBTRg`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          details: result
        });
      });
    // const form = event.target;
    // const reqPost = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // };
    // fetch('api/trip', reqPost)
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

  handleChange() {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    // console.log(this.state);
    return (
      <>
        <div className="row flex-column">
          <label htmlFor="destination">
            Search Places
          </label>
          <Autocomplete />
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
