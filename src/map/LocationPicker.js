/** @module src/map/LocationPicker */

import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { isString, isNumber } from '../common/helpers';
import styles from './LocationPicker.styles';

/**
 * Wrapper around src/map/TextField to display address and launch location picker.
 * @extends Component
 */
class LocationPicker extends Component {
  onSelect = (location) => {
    this.props.onSelect(this.props.name, location);
  };

  navToLocationPicker = () => {
    const { navigation, locationPickerRoute, lat, lon, address } = this.props;

    navigation.navigate(locationPickerRoute, {
      onSelect: this.onSelect,
      address,
      point: isNumber(lat) && isNumber(lon) ? { latitude: lat, longitude: lon } : null
    });
  };

  render() {
    const { address, label, containerStyle } = this.props;
    const hasAddress = isString(address, true);

    return (
      <View style={containerStyle}>
        <Text style={styles.labelTop}>{hasAddress ? label : ''}</Text>
        <TouchableWithoutFeedback onPress={this.navToLocationPicker}>
          <View style={styles.touchable}>
            {hasAddress ? (
              <Text style={styles.input} numberOfLines={1}>{address}</Text>
            ) : (
              <Text style={styles.labelDefault} numberOfLines={1}>{label}</Text>
            )}
            <Icon name="my-location" size={22} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

LocationPicker.defaultProps = {
  name: '',
  label: 'Plassering',
  locationPickerRoute: 'LocationPicker',
  onSelect() {}
};

export default LocationPicker;
