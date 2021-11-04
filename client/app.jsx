import React from 'react';
import Home from './pages/home';
import NewTrip from './pages/newTrip';

export default class App extends React.Component {
  render() {
    return (
      <>
            <NewTrip />
            <Home />

      </>
    );
  }
}
