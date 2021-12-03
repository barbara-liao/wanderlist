import React from 'react';
import ItineraryList from '../components/itinerary-list';
import Spinner from '../components/spinner';
import AppContext from '../lib/app-context';

export default class TripItinerary extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      action: '',
      weather: null,
      trip: null,
      itineraries: null,
      itemViewed: null,
      itemSelectedId: null,
      itemSelected: null,
      tripId: this.props.tripId,
      loading: false,
      error: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('user-jwt')
      }
    };

    fetch(`/api/trip/${this.props.tripId}`, req)
      .then(response => response.json())
      .then(trip => {
        this.setState({ trip });
      })
      .catch(err => {
        this.setState({ error: true });
        console.error('Error: ', err);
      });

    fetch(`/api/trip/${this.props.tripId}/itinerary`, req)
      .then(response => response.json())
      .then(itineraries => {
        this.setState({ loading: false });
        this.setState({ itineraries });
      })
      .catch(err => {
        this.setState({ error: true });
        console.error('Error: ', err);
      });
  }

  handleClick(event) {
    if (event.target.nodeName !== 'I') {
      const id = event.target.id;
      if (id === 'edit') {
        const id = event.target.id;
        this.setState({ action: id });
      } else if (event.target.text === 'Remove') {
        const itinId = Number(event.target.id);
        const index = this.state.itineraries.findIndex(itinerary => itinerary.itineraryId === itinId);
        const req = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': window.localStorage.getItem('user-jwt')
          }
        };
        fetch(`/api/itinerary/${itinId}`, req)
          .then(result => {
            const newItin = [...this.state.itineraries];
            newItin.splice(index, 1, result);
            this.setState({ itineraries: newItin });
          })
          .catch(err => console.error(err));
      }

      if (this.state.itemViewed === Number(id)) {
        this.setState({
          itemViewed: null,
          itemSelectedId: null
        });
      } else if (this.state.itemViewed !== Number(id) && event.target.text !== 'Remove') {
        this.setState({
          itemViewed: Number(id),
          itemSelectedId: null
        });
      }
    } else if (event.target.nodeName === 'I') {
      const itineraryId = Number(event.target.id);
      const itemSelectedId = Number(this.state.itemSelectedId);

      if (itemSelectedId === itineraryId) {
        this.setState({ itemSelectedId: null });
      } else {
        this.setState({ itemSelectedId: itineraryId });
      }
    }
  }

  render() {
    if (this.state.trip === null) { return null; }
    const { loading, error } = this.state;
    return (
      <>
        <div className="header-container">
          <div className="row">
            <div className="column-half header-margin">
              <h2 className="title-margin">My Itinerary</h2>
              <p className="title-margin trip-to-font">Trip to {this.state.trip.destination}</p>
            </div>
            <div className="column-half flex align-center justify-end">
              <a className="maps-button flex justify-center align-center" href={`#maps?tripId=${this.state.tripId}`}>View Map <i className="fas fa-map-marked-alt icon-padding-left"></i></a>
              <a className="add-button margin-left" id="add" href={`#add-trip?tripId=${this.state.tripId}`}><i className="fas fa-plus"></i></a>
            </div>
          </div>
        </div>
        {
          error
            ? <div className="flex flex-column margin-auto">
                <p className="flex margin-auto">Something went wrong with the request.</p>
                <p className="flex margin-auto"> Please try again later!</p>
              </div>
            : (
                loading
                  ? <Spinner />
                  : <ItineraryList onClick={this.handleClick} trips={this.state} />
              )
        }
      </>
    );
  }
}

TripItinerary.contextType = AppContext;
