import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  render() {
    return (
      <>
        <div className="nav">
          <div className="container flex">
            <a href="#trips" className="menu flex align-center"><i className="fas fa-bars"></i></a>
            <a href="#trips" className="logo flex align-center">WanderList</a>
          </div>
        </div>
      </>
    );
  }
}
