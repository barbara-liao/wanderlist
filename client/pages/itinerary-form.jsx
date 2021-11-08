import React from 'react';
import Itinerary from '../components/add-itinerary';

export default class ItineraryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      date: '',
      startTime: '',
      endTime: '',
      address: '',
      placeId: '',
      details: []
    };
  }

  handleSubmit() {
    event.preventDefault();

    // };

    // fetch('api/');
  }

  render() {
    return (
      <div className="body-container">
        <div className="row">
          <h3 className="header-margin">Add a Place</h3>
        </div>
        <div className="flex justify-center">
          <form onSubmit={this.handleSubmit}>
            <Itinerary tripId={this.props.tripId}/>
          </form>
        </div>
      </div>
    );
  }
}
