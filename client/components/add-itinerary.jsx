import React from 'react';
function AddItinerary(props) {
  return (
    <form>
      <div className="row flex-column">
        <label htmlFor="destination">
          Places to Visit
        </label>
        <input
          required
          id="place"
          type="text"
          name="place"
          // onChange={this.handleChange}
          className="itinerary-input poppins">
        </input>
      </div>
      <div className="row flex-column">
        <label htmlFor="destination">
          Date
        </label>
        <input
          required
          id="date"
          type="date"
          name="date"
          // onChange={this.handleChange}
          className="itinerary-input poppins">
        </input>
      </div>
      <div className="row flex-column">
        <label htmlFor="destination">
          Start Time
        </label>
        <input
          required
          id="startTime"
          type="time"
          name="startTime"
          // onChange={this.handleChange}
          className="itinerary-input poppins">
        </input>
      </div>
      <div className="row flex-column">
        <label htmlFor="destination">
          End Time
        </label>
        <input
          required
          id="endTime"
          type="time"
          name="endTime"
          // onChange={this.handleChange}
          className="itinerary-input poppins">
        </input>
      </div>
      <div className="row justify-space-between">
        <button className="cancel-button">Cancel</button>
        <button className="add-save-button">Add</button>
      </div>
    </form>
  );

}
function RenderPage(props) {
  return (
    <AddItinerary />
  );
}

function Itinerary(props) {
  return (
    <div className="body-container">
      <div className="row">
        <h3>Add a Place</h3>
      </div>
      <div className="flex justify-center">
        <RenderPage />
      </div>
    </div>
  );
}

export default Itinerary;
