import React from 'react';
import AddItineraryForm from '../components/add-itinerary-form';
import EditItineraryForm from '../components/edit-itinerary-form';

export default class ItineraryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
  }

  componentDidMount() {
    const tripId = this.props.tripId;
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('user-jwt')
      }
    };
    fetch(`/api/trip/${tripId}`, req)
      .then(response => response.json())
      .then(itinerary => {
        this.setState({
          startDate: itinerary.startDate,
          endDate: itinerary.endDate
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.startDate) { return null; }
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
                <div className="full-width">
                  <AddItineraryForm routePath={this.props.routePath} tripId={this.props.tripId} tripDetail={this.state}/>
                </div>
                )
              : (
                <div className="full-width">
                  <EditItineraryForm routePath={this.props.routePath} tripId={this.props.tripId} itineraryId={this.props.itineraryId} tripDetail={this.state}/>
                </div>
                )
          }
        </div>
      </div>
    );
  }
}
