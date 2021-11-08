import React from 'react';
import ItineraryList from '../components/itinerary-list';
// import parseRoute from '../lib/parse-route';

export default class TripItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      trip: null,
      tripId: this.props.tripId
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

  render() {
    // console.log(this.state);
    if (this.state.trip === null) { return null; }
    return (
      <>
        <div className="header-container">
          <div className="row">
            <div className="column-half header-margin">
              <h2 className="title-margin">My Itinerary</h2>
              <p className="title-margin trip-to-font">Trip to Honolulu</p>
            </div>
            <div className="column-half flex align-center justify-end">
              <a className="add-edit-button" id="add-button" href={`#add-edit-trip?tripId=${this.state.tripId}`}><i className="fas fa-plus"></i></a>
            </div>
          </div>
        </div>
        <ItineraryList trips={this.state} />
      </>
    );
  }
}
