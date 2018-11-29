/** @module src/market/product/ProfileScreenHeader */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette, header } from '../common/styles';
import { getStateParam } from '../common/helpers';
import DrawerOpener from '../common/DrawerOpener';
import HeaderButton from '../common/HeaderButton';

/*
 * Header for ProfileScreen.
 * @extends Component
 */
class ProfileScreenHeader extends Component {
  goBack = () => {
    this.props.navigation.goBack();
  };

  logout = () => {
    this.props.navigation.setParams({ showLogoutConfirm: true });
  };

  edit = () => {
    this.props.navigation.navigate('ProfileSettings', { redirectToProfile: true });
  };

  render() {
    const { navigation } = this.props;
    const profileLoaded = getStateParam(navigation, 'profileLoaded', false);

    return (
      <View style={header.transparent}>
        <View style={header.sectionLeft}>
          {getStateParam(navigation, 'isOwnProfile', false) ? (
            <DrawerOpener navigate={navigation.navigate} />
          ) : (
              <HeaderButton onPress={this.goBack}>
                <Icon name="arrow-back" size={20} color={palette[0]} />
              </HeaderButton>
            )}
          {/* {!profileLoaded && <Text style={header.text}>Profil</Text>} */}
        </View>
        {getStateParam(navigation, 'isOwnProfile', false) && (
          <View style={header.sectionRight}>
            <HeaderButton onPress={this.edit}>
              <Icon name="mode-edit" size={20} color={palette[0]} />
            </HeaderButton>
            <HeaderButton onPress={this.logout}>
              <Icon name="exit-to-app" size={20} color={palette[0]} />
            </HeaderButton>
          </View>
        )}
      </View>
    );
  }
}

export default ProfileScreenHeader;
