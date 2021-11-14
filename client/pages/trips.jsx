import React from 'react';
import TripList from '../components/trip-list';

export default class ViewTrips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      tripId: null
    };
  }

  componentDidMount() {
    fetch('api/trip')
      .then(response => response.json())
      .then(data => {
        this.setState({
          trips: data
        });
      })
      .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <div className="body-container">
        <div className="row header-margin justify-space-between align-center">
          <h2>My Trips</h2>
          <a className="new-trip-button flex justify-center align-center poppins" href="#new-trip">New Trip</a>
        </div>
          {
            this.state.trips.length === 0
              ? <p className="flex justify-center">No trips. Add a new trip!</p>
              : <TripList trips={this.state.trips} />
          }
      </div>
    );
  }
}
