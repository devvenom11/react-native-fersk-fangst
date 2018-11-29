/** @module src/map/LocationPickerScreen */

import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getStateParam, bindComponentRef, isString } from '../common/helpers';
import Button from '../common/Button';
import Map from './Map';
import MapHeader from './MapHeader';
import styles from './LocationPickerScreen.styles';

/**
 * Component for location picker screen.
 * @extends Component
 */
class LocationPickerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <MapHeader navigation={navigation} title="Velg adresse på kartet" />
  })

  constructor(props) {
    super(props);

    const point = getStateParam(props.navigation, 'point');

    this.state = {
      region: point,
      point,
      address: point != null ? getStateParam(props.navigation, 'address') : null,
      addressLoading: false,
      onSelect: getStateParam(props.navigation, 'onSelect', () => { })
    };

    Geocoder.setApiKey('AIzaSyD9OkV9sbtsW7nojsuikYW4dJa0nYtzVgw');
  }

  componentDidMount() {
    this.props.navigation.setParams({ showMyLocation: this.refsCache.get('mapRef').showMyLocation });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  };

  onMapPress = ({ nativeEvent }) => {
    this.setState({ point: { ...nativeEvent.coordinate } });
    this.getAddress(nativeEvent.coordinate);
  };

  getAddress = async ({ latitude, longitude }) => {
    this.setState({ addressLoading: true });

    try {
      const response = await Geocoder.getFromLatLng(latitude, longitude);

      if (response.results.length > 0) {
        this.setState({ address: response.results[0].formatted_address.replace(this.countryRexp, '') });
      }
    } catch (e) {
      this.setState({ address: null });
    } finally {
      this.setState({ addressLoading: false });
    }
  };

  selectAddress = () => {
    const { address, point } = this.state;

    this.props.navigation.goBack();

    this.state.onSelect({ address, lat: point.latitude, lon: point.longitude });
  };

  countryRexp = /,\sNorway/;

  render() {
    const { address } = this.state;
    const hasAddress = isString(address, true);

    return (
      <View style={styles.container}>
        <View style={styles.addressBar}>
          {this.state.addressLoading ? (
            <ActivityIndicator size={'small'} />
          ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Icon name="location-on" size={24} style={styles.addressBarIcon} />
                <Text style={styles.addressBarText}>
                  {hasAddress ? (
                    <Text>{address}</Text>
                  ) : (
                      <Text style={styles.addressBarInfo}>Pek på kartet for å velge adresse</Text>
                    )}
                </Text>
              </ScrollView>
            )}
        </View>
        <Map
          ref={bindComponentRef.call(this, 'mapRef')}
          region={this.state.region}
          showMyLocation
          onRegionChangeComplete={this.onRegionChangeComplete}
          onPress={this.onMapPress}
          style={styles.map}
        >
          {this.state.point != null && <MapView.Marker coordinate={this.state.point} />}
        </Map>
        {hasAddress && (
          <View style={styles.selectButton}>
          <Button onPress={this.selectAddress}>
            <Text style={styles.selectButtonText}>Angi</Text>
          </Button>
          </View>
        )}
      </View>
    );
  }
}

export default LocationPickerScreen;
