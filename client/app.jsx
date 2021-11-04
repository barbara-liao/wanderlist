import React from 'react';
import Home from './pages/home';
import NewTrip from './pages/new-trip';
import parseRoute from './lib/parse-route';
import Navbar from './components/navbar';
import ViewTrips from './pages/trips';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'newTrip') {
      return <NewTrip />;
    } else if (route.path === 'trips') {
      return <ViewTrips />;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <ViewTrips />
        <Home />
      </>
    );
  }
}
