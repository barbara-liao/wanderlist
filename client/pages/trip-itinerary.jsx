import React from 'react';
import ItineraryList from '../components/itinerary-list';
import AppContext from '../lib/app-context';

export default class TripItinerary extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      weather: null,
      trip: null,
      itineraries: null,
      itemViewed: null,
      itemSelectedId: null,
      itemSelected: null,
      action: '',
      tripId: this.props.tripId,
      loading: false
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
        console.error('Error: ', err);
      });

    fetch(`/api/trip/${this.props.tripId}/itinerary`, req)
      .then(response => response.json())
      .then(itineraries => {
        this.setState({ loading: false });
        this.setState({ itineraries });
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  handleClick(event) {
    if (event.target.nodeName !== 'I') {
      const id = event.target.id;
      if (id === 'edit') {
        const id = event.target.id;
        this.setState({ action: id });

      }

      if (this.state.itemViewed === Number(id)) {
        this.setState({
          itemViewed: null,
          itemSelectedId: null
        });
      } else {
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
    const loading = this.state.loading;
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
          loading
            ? <div className="lds-default margin-auto">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            : <ItineraryList onClick={this.handleClick} trips={this.state} />
        }
      </>
    );
  }
}

TripItinerary.contextType = AppContext;
