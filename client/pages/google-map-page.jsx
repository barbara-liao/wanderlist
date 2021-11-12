import React from 'react';
import MapContainer from '../components/google-maps';

export default class GoogleMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      itineraries: null
    };
  }

  componentDidMount() {
    fetch(`api/trip/${this.props.tripId}`)
      .then(response => response.json())
      .then(trip => {
        this.setState({ trip });
      })
      .catch(err => console.error('Error: ', err));

    fetch(`api/trip/${this.props.tripId}/itinerary`)
      .then(response => response.json())
      .then(itineraries => {
        this.setState({ itineraries });
      })
      .catch(err => console.error('Error: ', err));
  }

  render() {
    if (this.state.trip === null) { return null; }
    const itineraries = this.state.itineraries;
    return (
      <>
        <div className="row map-header-container">
          <div className="row header-margin">
            <div className="col-one-tenth">
              <div className="row title-margin justify-center align-center">
                <i className="fas fa-arrow-left arrow-icon"></i>
              </div>
            </div>
            <div className="col-nine-tenth">
              <div className="row flex-column">
                <div className="row">
                <h2 className="title-margin">My Itinerary</h2>
                </div>
                <div className="row">
                <p className="title-margin trip-to-font">Trip to {this.state.trip.destination}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MapContainer itineraries={itineraries} />
      </>
    );
  }
}
