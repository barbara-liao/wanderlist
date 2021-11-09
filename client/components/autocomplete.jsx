import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete from 'react-places-autocomplete';

export class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(address, placeId) {
    this.setState({
      address,
      placeId
    });
  }

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <PlacesAutocomplete
          value={this.props.address}
          onChange={this.props.onChange}
          onSelect={this.props.onSelect}
          style={{ position: 'relative' }}
          name="address"
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  className: 'itinerary-input poppins'
                })}
              />
              <div className="autocomplete-dropdown-container position-absolute">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                    key={suggestion.placeId}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_API_KEY)
})(Autocomplete);
