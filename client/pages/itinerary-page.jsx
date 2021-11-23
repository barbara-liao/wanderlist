import React from 'react';
import AddItineraryForm from '../components/add-itinerary-form';
import EditItineraryForm from '../components/edit-itinerary-form';

export default class ItineraryPage extends React.Component {
  render() {
    return (
      <div className="body-container">
        <div className="row">
          {
            this.props.routePath === 'add-trip'
              ? (
                <h3 className="header-margin">Add a Place</h3>
                )
              : (
                <h3 className="header-margin">Edit Place</h3>
                )
          }
        </div>
        <div className="flex justify-center">
          {
            this.props.routePath === 'add-trip'
              ? (
                <AddItineraryForm routePath={this.props.routePath} tripId={this.props.tripId}/>
                )
              : (
                <EditItineraryForm routePath={this.props.routePath} tripId={this.props.tripId} itineraryId={this.props.itineraryId}/>
                )
          }
        </div>
      </div>
    );
  }
}
