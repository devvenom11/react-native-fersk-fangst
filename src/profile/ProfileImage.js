/** @module src/market/profile/ProfileImage */

import React, { Component } from 'react';
import { Image } from 'react-native';

import styles from './ProfileImage.styles';

/**
 * Component for profile image.
 * @extends Component
 */
class ProfileImage extends Component {
  render() {
    const { image, imageStyle } = this.props;

    return (
      <Image
        style={[styles.container, imageStyle]}
        source={image != null && image.length > 0 ? { uri: image } : require('./img/profile.png')}
        resizeMethod="resize"
      />
    );
  }
}

ProfileImage.defaultProps = {
  image: null,
  imageStyle: {}
};

export default ProfileImage;
