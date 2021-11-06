import React from 'react';
import ItineraryList from '../components/itinerary-list';

export default class TripItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      trip: null,
      hasFetched: false
    };
  }

  componentDidMount() {
    fetch(`api/trip/${this.props.tripId}`)
      .then(response => response.json())
      .then(trip => {
        this.setState({ trip });
      })
      .catch(err => console.error('Error: ', err));

  }

  componentDidUpdate() {
    if (!this.state.hasFetched) {
      fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${this.state.trip.destination}&key=1a09f21e5bf940b98fe47a1430a6f5d7`)
        .then(response => response.json())
        .then(weather => {
          this.setState({ weather, hasFetched: true });
        })
        .catch(err => console.error(err));
      return true;
    }
    return false;
  }

  render() {
    if (this.state.trip === null) { return null; }
    return (
      <>
        <div className="header-container">
          <div className="row">
            <div className="header-margin">
              <h2 className="title-margin">My Itinerary</h2>
              <p className="title-margin trip-to-font">Trip to Honolulu</p>
            </div>
          </div>
        </div>
        <ItineraryList trips={this.state.trip} />
      </>
    );
  }
}
