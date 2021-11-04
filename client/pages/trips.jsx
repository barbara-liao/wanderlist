import React from 'react';
// import NewTrip from './new-trip';
import TripList from '../components/trip-list';

export default class ViewTrips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
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
      <TripList trips={this.state.trips} />
    );
  }
}
