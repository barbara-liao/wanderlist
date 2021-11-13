import React from 'react';
import NewTrip from './pages/new-trip';
import parseRoute from './lib/parse-route';
import Navbar from './components/navbar';
import ViewTrips from './pages/trips';
import TripItinerary from './pages/trip-itinerary';
import ItineraryPage from './pages/itinerary-page';
import GoogleMapPage from './pages/google-map-page';
import RegisterPage from './pages/register-page';

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
    } else if (route.path === 'add-trip') {
      const tripId = route.params.get('tripId');
      return <ItineraryPage routePath={route.path} tripId={tripId}/>;
    } else if (route.path === 'edit-trip') {
      const itineraryId = route.params.get('itineraryId');
      const tripId = route.params.get('tripId');
      return <ItineraryPage routePath={route.path} tripId={tripId} itineraryId={itineraryId} />;
    } else if (route.path === 'maps') {
      const tripId = route.params.get('tripId');
      return <GoogleMapPage routePath={route.path} tripId={tripId} />;
    } else if (route.path === 'register') {
      return <RegisterPage routePath={route.path} />;
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
