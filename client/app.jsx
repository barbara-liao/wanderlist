import React from 'react';
import NewTrip from './pages/new-trip';
import parseRoute from './lib/parse-route';
import Navbar from './components/navbar';
import ViewTrips from './pages/trips';
import TripItinerary from './pages/trip-itinerary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState(
        { route: parseRoute(window.location.hash) }
      );
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <NewTrip />;
    } else if (route.path === 'trips') {
      return <ViewTrips />;
    } else if (route.path === 'trip-itinerary') {
      const tripId = route.params.get('tripId');
      return <TripItinerary tripId={tripId} />;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderPage()}
      </>
    );
  }
}
