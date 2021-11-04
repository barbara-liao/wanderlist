import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <>
        <div className="nav">
          <div className="container flex">
            <a href="#" className="menu flex align-center"><i className="fas fa-bars"></i></a>
            <a href="#!" className="logo flex align-center">WanderList</a>
          </div>
        </div>
      </>
    );
  }
}
