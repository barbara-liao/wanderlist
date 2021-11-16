import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  render() {
    const { handleSignOut } = this.context;
    return (
      <>
        <div className="nav">
          <div className="body-container flex justify-space-between">
            <a href="#trips" className="logo flex align-center">WanderList</a>
            <a onClick={handleSignOut} className="flex align-center color-white">
              {
                this.context.user ? 'Sign Out' : 'Sign In'
              }
            </a>
          </div>
        </div>
      </>
    );
  }
}

Navbar.contextType = AppContext;
