import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from '../common/styles';
import { isString } from '../common/helpers';
import Touchable from '../common/Touchable';
import ProfileImage from './ProfileImage';
import styles from './ProfileInfo.styles';

/*
 * Component for profile info.
 * @extends Component
 */
class ProfileInfo extends Component {
  render() {
    const { profile } = this.props;

    return (
      <Touchable onPress={this.props.onPress} disabled={this.props.disableTouch}>
        <View style={styles.container}>
          <ProfileImage image={profile.photo} imageStyle={styles.profileImg} />
          <View style={styles.info}>
            <Text style={[styles.onlineStatus, this.props.onlineStyle]}>
              {profile.isOnline ? 'Online' : 'Offline'}
            </Text>
            <Text style={[styles.name, this.props.nameStyle]} numberOfLines={1} selectable>
              {profile.name}
            </Text>
            {isString(profile.address, true) && (
              <View style={styles.row}>
                <Icon name="location-on" size={18} color={`${palette[3]}70`} />
                <Text style={[styles.rowTitle, this.props.locationStyle]} numberOfLines={1}>
                  {profile.address}
                </Text>
              </View>
            )}
            {isString(profile.phone, true) && (
              <View style={styles.row}>
                <Icon name="phone" size={18} color={`${palette[3]}70`} />
                <Text style={[styles.rowTitle, this.props.phoneStyle]} numberOfLines={1} selectable>
                  {profile.phone}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Touchable>
    );
  }
}

ProfileInfo.defaultProps = {
  profile: {
    isOnline: false,
    photo: null,
    name: '',
    location: '',
    phone: ''
  },
  disableTouch: false,
  avatarStyle: {},
  nameStyle: {},
  locationStyle: {},
  phoneStyle: {},
  onPress() { }
};

export default ProfileInfo;
