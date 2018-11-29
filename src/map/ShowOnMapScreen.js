/** @module src/map/ShowOnMapScreen */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Appsee from 'react-native-appsee';

import { getStateParam, bindComponentRef } from '../common/helpers';
import Map from './Map';
import MapHeader from './MapHeader';
import styles from './ShowOnMapScreen.styles';

/**
 * Component screen for showing specified address on map.
 * @extends Component
 */
class ShowOnMapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <MapHeader navigation={navigation} title="Kart" />
  })

  constructor(props) {
    super(props);

    const point = {
      latitude: getStateParam(props.navigation, 'latitude', 0),
      longitude: getStateParam(props.navigation, 'longitude', 0)
    };

    const region = {
      ...point,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0005
    };

    this.state = {
      region,
      point,
      address: getStateParam(props.navigation, 'address', '')
    };
  }

  componentDidMount() {
    Appsee.addEvent('Reached MapScreen');
    this.props.navigation.setParams({ showMyLocation: this.refsCache.get('mapRef').showMyLocation });
  }

  // onMapReady handler wrapper is needed for hackish solution to control visibility of map marker.
  // Issue: https://github.com/react-community/react-native-maps/issues/275
  onMapReady = () => {
    this.refsCache.get('markerRef').showCallout();
  };

  render() {
    return (
      <Map
        ref={bindComponentRef.call(this, 'mapRef')}
        region={this.state.region}
        style={styles.map}
        onMapReady={this.onMapReady}
      >
        <MapView.Marker
          ref={bindComponentRef.call(this, 'markerRef')}
          coordinate={this.state.point}
          title={this.state.address}
        />
      </Map>
    );
  }
}

export default ShowOnMapScreen;
