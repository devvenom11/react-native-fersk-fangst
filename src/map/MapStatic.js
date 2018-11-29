/** @module src/map/MapStatic */

import React, { Component } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { bindComponentRef } from '../common/helpers';
import { palette } from '../common/styles';
import styles from './MapStatic.styles';

/**
 * Wrapper component for static MapView from react-native-maps.
 * @extends Component
 */
class MapStatic extends Component {
  constructor(props) {
    super(props);

    let point = null;
    let region = null;

    if (typeof props.lat === 'number' && typeof props.lon === 'number') {
      point = { latitude: props.lat, longitude: props.lon };
      region = { ...point, latitudeDelta: 0.005, longitudeDelta: 0.0005 };
    }

    this.state = { region, point };
  }

  // onMapReady and onPress handler wrappers are needed for hackish solution to control visibility of map marker.
  // Issue: https://github.com/react-community/react-native-maps/issues/275
  onMapReady = () => {
    const { showMarker, onMapReady } = this.props;

    if (showMarker) this.refsCache.get('markerRef').showCallout();

    if (typeof onMapReady === 'function') onMapReady();
  };

  onPress = (evt) => {
    this.refsCache.get('markerRef').showCallout();

    if (typeof this.props.onPress === 'function') this.props.onPress(evt);
  };

  renderPlaceholder = () => (
    typeof this.props.placeholder === 'function' ? (
      this.props.placeholder()
    ) : (
        <View style={styles.placeholder}>
          <Icon name="map" style={styles.iconInMap} size={48} color={`${palette[3]}30`} />
        </View>
      )
  );

  render() {
    const { region, point } = this.state;
    const { address, showMarker } = this.props;

    return region != null ? (
      <MapView
        {...this.props}
        provider={PROVIDER_GOOGLE}
        region={region}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        cacheEnabled
        showsUserLocation={false}
        showsMyLocationButton={false}
        style={styles.map}
        onMapReady={this.onMapReady}
        onPress={this.onPress}
      >
        {showMarker && (
          <MapView.Marker ref={bindComponentRef.call(this, 'markerRef')} coordinate={point} title={address} />
        )}
      </MapView>
    ) : this.renderPlaceholder();
  }
}

MapStatic.defaultProps = {
  lat: 0,
  lon: 0,
  address: '',
  showMarker: false
};

export default MapStatic;
