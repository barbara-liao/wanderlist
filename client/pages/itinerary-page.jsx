import React from 'react';
import ItineraryForm from '../components/itinerary-form';

export default class ItineraryPage extends React.Component {
  render() {
    return (
      <div className="body-container">
        <div className="row">
          <h3 className="header-margin">Add a Place</h3>
        </div>
        <div className="flex justify-center">
          <ItineraryForm tripId={this.props.tripId}/>
        </div>
      </div>
    );
  }
}
