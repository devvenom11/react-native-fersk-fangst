/** @module src/map/MapHeader */

import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette, header } from '../common/styles';
import { getStateParam } from '../common/helpers';
import HeaderButton from '../common/HeaderButton';

/**
 * Header component for map related screens.
 * @extends Component
 */
class MapHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkingMyLocation: false,
      hasGeoLocPermission: false,
      showMyLocation() { }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showMyLocation: getStateParam(nextProps.navigation, 'showMyLocation', () => { })
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  showMyLocation = async () => {
    this.setState({ checkingMyLocation: true });

    await this.state.showMyLocation();

    this.setState({ checkingMyLocation: false });
  };

  render() {
    return (
      <View style={header.default}>
        <HeaderButton onPress={this.goBack}>
          <Icon name="arrow-back" size={22} color={palette[0]} />
        </HeaderButton>
        <Text style={header.text}>{this.props.title}</Text>
        {this.state.checkingMyLocation ? (
          <ActivityIndicator animate size={'small'} style={header.item} color={palette[0]} />
        ) : (
            <HeaderButton onPress={this.showMyLocation}>
              <Icon name="my-location" size={22} color={palette[0]} />
            </HeaderButton>
          )}
      </View>
    );
  }
}

MapHeader.defaultProps = {
  title: 'Kart'
};

export default MapHeader;
