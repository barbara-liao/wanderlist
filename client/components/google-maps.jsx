import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import extractGeometry from '../lib/extract-geometry';
import extractGeometryDetails from '../lib/extract-geometry-details';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: null,
      bounds: null,
      pointsDetail: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 21.3069,
        lng: -157.8583
      }
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.makeBounds = this.makeBounds.bind(this);
    this.onReady = this.onReady.bind(this);
  }

  componentDidMount() {
    const points = extractGeometry(this.props.itineraries);
    const pointsDetail = extractGeometryDetails(this.props.itineraries);
    this.setState({ points, pointsDetail });
  }

  makeBounds() {
    const points = this.state.points;
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    this.setState({ bounds });
  }

  onReady() {
    this.makeBounds();
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    if (!this.state.points) { return null; }
    const pointsDetail = this.state.pointsDetail;
    return (
      <div className="map-container">
        <div
          style={{
            position: 'relative',
            height: '32rem'
          }}
        >
          <Map style={{}}
            google={this.props.google}
            onReady={this.onReady}
            bounds={this.state.bounds}>
              {
                pointsDetail.map(location => {
                  return (
                    <Marker
                      key={location.name}
                      onClick={this.onMarkerClick}
                      position={{
                        lat: location.lat,
                        lng: location.lng
                      }}
                      name={location.name}
                      address={location.address}
                      phoneNumber={location.phoneNumber}
                    />
                  );
                })
              }
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div className="poppins">
                <h3 className="window-margin">{this.state.selectedPlace.name}</h3>
                <p className="itinerary-margin">{this.state.selectedPlace.address}</p>
                <a className="itinerary-margin" href={`tel:${this.state.selectedPlace.phoneNumber}`}>{this.state.selectedPlace.phoneNumber}</a>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_API_KEY)
})(MapContainer);
