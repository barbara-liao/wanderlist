import React from 'react';

export default class EditItineraryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: null,
      itemSelectedId: null
    };
  }

  componentDidMount() {
    const itineraryId = this.props.itineraryId;
    fetch(`api/itinerary/${itineraryId}`)
      .then(response => response.json())
      .then(itinerary => {
        this.setState({
          itemSelected: itinerary,
          itemSelectedId: Number(itineraryId)
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.itemSelected) { return null; }
    const { name } = this.state.itemSelected;
    // console.log(this.state);
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="row flex-column">
            <div>
              <h4 className="day-margin">{name}</h4>
            </div>
          </div>
          <div className="row flex-column day-margin">
            <label htmlFor="destination">
              Date
            </label>
            <input
              required
              id="date"
              type="date"
              name="date"
              onChange={this.handleChange}
              className="itinerary-input poppins">
            </input>
          </div>
          <div className="row flex-column day-margin">
            <label htmlFor="destination">
              Start Time
            </label>
            <input
              required
              id="startTime"
              type="time"
              name="startTime"
              onChange={this.handleChange}
              className="itinerary-input poppins">
            </input>
          </div>
          <div className="row flex-column day-margin">
            <label htmlFor="destination">
              End Time
            </label>
            <input
              required
              id="endTime"
              type="time"
              name="endTime"
              onChange={this.handleChange}
              className="itinerary-input poppins">
            </input>
          </div>
          <div className="row justify-space-between header-margin">
            <a className="cancel-button flex justify-center align-center" href={`#trip-itinerary?tripId=${this.props.tripId}`}>Cancel</a>
            <button className="add-save-button poppins">Add</button>
          </div>
        </form>
      </>
    );
  }
}
