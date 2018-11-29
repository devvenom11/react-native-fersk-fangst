/** @module src/map/Map */

import React, { Component } from 'react';
import { PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import Toast from '@remobile/react-native-toast';

import { bindComponentRef, timeout } from '../common/helpers';

function getMyLocation(enableHighAccuracy) {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { resolve({ latitude: coords.latitude, longitude: coords.longitude }); },
      () => { resolve(null); },
      { enableHighAccuracy, ...(enableHighAccuracy ? {} : { timeout: 10000, maxAge: 60000 }) }
    );
  });
}

/**
 * Wrapper component for MapView from react-native-maps.
 * @extends Component
 */
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasGeoLocPermission: true,
      region: {
        ...{
          // Oslo, Norway
          latitude: 59.9139,
          longitude: 10.7522,
          latitudeDelta: 10,
          longitudeDelta: 0.5,          
        },
        ...props.region
      }
    };
  }

  async componentWillMount() {
    this.setState({}, timeout(() => {
      if (this.state.hasGeoLocPermission && this.props.showMyLocation) this.showMyLocation();
    }, 1000));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.region != null) {
      this.setState({ region: nextProps.region });
    }
  }

  showMyLocation = async (enableHighAccuracy = true, tries = 3) => {

    if (this.state.hasGeoLocPermission && tries > 0) {

      const coords = await getMyLocation(enableHighAccuracy);
      const mapViewRef = this.refsCache.get('mapViewRef');

      if (coords != null && mapViewRef != null) {
        mapViewRef.animateToCoordinate(coords);

        return true;
      }

      return this.showMyLocation(false, tries - 1);
    }

    Toast.show('Kunne ikke få gjeldende plassering', 2000);

    return false;
  };

  checkGeoLocPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

    try {
      if (!await PermissionsAndroid.check(permission)) {
        return await PermissionsAndroid.request(permission) === PermissionsAndroid.RESULTS.GRANTED;
      }

      return true;
    } catch (e) {
      return false;
    }
  };

  animateToCoordinate = (coordinates, duration) => {
    this.refsCache.get('mapViewRef').animateToCoordinate(coordinates, duration);
  };

  render() {
    return (
      <MapView
        {...this.props}
        region={this.state.region}
        showsUserLocation={this.state.hasGeoLocPermission}
        showsMyLocationButton={false}
        ref={bindComponentRef.call(this, 'mapViewRef')}        
      >
        {this.props.children}
      </MapView>
    );
  }
}

Map.defaultProps = {
  showMyLocation: false
};

export default Map;
