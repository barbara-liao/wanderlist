import React from 'react';
import ItineraryList from '../components/itinerary-list';

export default class TripItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      trip: null,
      itineraries: null,
      itemViewed: null,
      itemSelectedId: null,
      itemSelected: null,
      tripId: this.props.tripId
    };
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
    if (event.target.nodeName !== 'I') {
      const id = event.target.id;
      if (id === 'edit') {
        // const id = event.target.id;
        // console.log('hello', id);
      }

      if (this.state.itemViewed === Number(id)) {
        this.setState({
          itemViewed: null
        });
      } else {
        this.setState({
          itemViewed: Number(id)
        });
      }
    } else if (event.target.nodeName === 'I') {
      const itineraryId = Number(event.target.id);
      const itemSelectedId = Number(this.state.itemSelectedId);
      fetch(`api/itinerary/${itineraryId}`)
        .then(response => response.json())
        .then(itinerary => {
          this.setState({
            itemSelected: itinerary,
            itemSelectedId: Number(itineraryId)
          });
          if (itemSelectedId === itineraryId) {
            this.setState({ itemSelectedId: null });
          } else {
            this.setState({ itemSelectedId: itineraryId });
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
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
        <ItineraryList onClick={this.handleClick} trips={this.state} />
      </>
    );
  }
}
