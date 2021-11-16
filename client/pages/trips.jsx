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
    fetch('/api/trip')
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
      <TripList onClick={this.handleClick} trips={this.state.trips} />
    );
  }
}
