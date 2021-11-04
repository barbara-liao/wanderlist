import React from 'react';
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
