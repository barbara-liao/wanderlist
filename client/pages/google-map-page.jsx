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
    Promise.all([
      fetch(`api/trip/${this.props.tripId}`),
      fetch(`api/trip/${this.props.tripId}/itinerary`)
    ])
      .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
      .then(([trip, itineraries]) => {
        this.setState({ trip, itineraries });
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
                <a href={`#trip-itinerary?tripId=${this.props.tripId}`}><i className="fas fa-arrow-left arrow-icon color-black"></i></a>
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
