import React from 'react';
import Navbar from './navbar';

export default class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selectedIcon: 'icons/icon-placeholder.svg',
      icon: 'icons/icon-placeholder.svg',
      destination: '',
      startDate: '',
      endDate: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick() {
    if (event.target.id === 'choose-icon') {
      this.setState({ modalOpen: true });
    } else if (event.target.className === 'icon') {
      const iconId = event.target.id;
      const iconUrl = `icons/icon-${iconId}.svg`;
      this.setState({
        selectedIcon: iconUrl
      });
    } else if (event.target.id === 'select-icon-button') {
      const icon = this.state.selectedIcon;
      this.setState({
        icon: icon,
        modalOpen: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('api/trip', req)
      .then(res => res.json())
      .then(result => {
        this.setState({
          modalOpen: false,
          selectedIcon: 'icons/icon-placeholder.svg',
          icon: 'icons/icon-placeholder.svg',
          destination: '',
          startDate: '',
          endDate: ''
        });
      });
    form.reset();
  }

  render() {
    const iconImage = this.state.icon;
    return (
      <>
        <IconPicker open={this.state} onClick={this.handleClick} />
        <Navbar />
        <form onSubmit={this.handleSubmit}>
          <div className="column">
            <div className="row justify-center align-center">
              <h3 className="trip-header">Plan a new trip</h3>
            </div>
            <div className="row justify-center align-center">
              <img src={iconImage} className="icon-image"></img>
              <a href="#" className="icon-button" id="choose-icon" onClick={this.handleClick}>Choose an icon</a>
            </div>
            <div className="flex justify-center flex-column">
              <div className="align-center margin-auto">
                <div className="row flex-column flex-center">
                  <div className="form-label">
                    <label htmlFor="destination">
                      Destination
                    </label>
                  </div>
                  <div>
                    <input
                    required
                    id="destination"
                    type="text"
                    name="destination"
                    placeholder="e.g. Paris, Japan..."
                    onChange={this.handleChange}
                    className="input poppins">
                    </input>
                  </div>
                </div>
                <div className="row flex-column flex-center">
                  <div className="form-label">
                    <label htmlFor="startDate">
                      Start Date
                    </label>
                  </div>
                  <div>
                    <input
                    required
                    id="startDate"
                    type="date"
                    name="startDate"
                    onChange={this.handleChange}
                    className="input poppins">
                    </input>
                  </div>
                </div>
                <div className="row flex-column flex-center">
                  <div className="form-label">
                    <label htmlFor="startDate">
                      End Date
                    </label>
                  </div>
                  <div>
                    <input
                      required
                      id="endDate"
                      type="date"
                      name="endDate"
                      onChange={this.handleChange}
                      className="input poppins">
                    </input>
                  </div>
                </div>
                <div className="flex justify-center plan-button-margin">
                  <button id="start-planning" type="submit" className="plan-button poppins">
                    Start Planning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

function IconPicker(props) {
  const handleClick = event => {
    const iconId = event.target.getAttribute('id');
    props.onClick(iconId);
  };

  if (props.open.modalOpen) {
    return (
      <div className="icon-modal margin-auto">
        <div className="row justify-space-between flex-wrap">
          <a><img id="barn" className="icon" onClick={handleClick} src="icons/icon-barn.svg"></img></a>
          <a><img id="bay" className="icon" onClick={handleClick} src="icons/icon-bay.svg"></img></a>
          <a><img id="beach" className="icon" onClick={handleClick} src="icons/icon-beach.svg"></img></a>
          <a><img id="camp" className="icon" onClick={handleClick} src="icons/icon-camp.svg"></img></a>
          <a><img id="canyon" className="icon" onClick={handleClick} src="icons/icon-canyon.svg"></img></a>
          <a><img id="city" className="icon" onClick={handleClick} src="icons/icon-city.svg"></img></a>
          <a><img id="country" className="icon" onClick={handleClick} src="icons/icon-country.svg"></img></a>
          <a><img id="desert" className="icon" onClick={handleClick} src="icons/icon-desert.svg"></img></a>
          <a><img id="industrial" className="icon" onClick={handleClick} src="icons/icon-industrial.svg"></img></a>
          <a><img id="lake" className="icon" onClick={handleClick} src="icons/icon-lake.svg"></img></a>
          <a><img id="lighthouse" className="icon" onClick={handleClick} src="icons/icon-lighthouse.svg"></img></a>
          <a><img id="mountain-lake" className="icon" onClick={handleClick} src="icons/icon-mountain-lake.svg"></img></a>
          <a><img id="mountain" className="icon" onClick={handleClick} src="icons/icon-mountain.svg"></img></a>
          <a><img id="night-lake" className="icon" onClick={handleClick} src="icons/icon-night-lake.svg"></img></a>
          <a><img id="plateau" className="icon" onClick={handleClick} src="icons/icon-plateau.svg"></img></a>
          <a><img id="barn" className="icon" onClick={handleClick} src="icons/icon-rural.svg"></img></a>
        </div>
        <div className="flex justify-end select-icon-margin">
          <button type="submit" className="select-icon poppins" id="select-icon-button" onClick={handleClick}>Select</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
