import React from 'react';
import NewTrip from './pages/new-trip';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';
import Navbar from './components/navbar';
import ViewTrips from './pages/trips';
import TripItinerary from './pages/trip-itinerary';
import ItineraryPage from './pages/itinerary-page';
import GoogleMapPage from './pages/google-map-page';
import AuthPage from './pages/auth-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState(
        { route: parseRoute(window.location.hash) }
      );
    });
    const token = window.localStorage.getItem('user-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('user-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('user-jwt');
    this.setState({ user: null });
    window.location.hash = '#sign-in';
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <AuthPage routePath={route.path} />;
    } else if (route.path === 'new-trip') {
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
    } else if (route.path === 'register' || route.path === 'sign-in') {
      return <AuthPage routePath={route.path} />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          {this.renderPage()}
        </>
      </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
