/** @module src/camera/CameraScreen */

import React, { Component } from 'react';
import { View } from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette, headerTransparent } from '../common/styles';
import Touchable from '../common/Touchable';
import styles from './CameraScreen.styles';

/**
 * Component for camera screen.
 * @extends Component
 */
class CameraScreen extends Component {
  static navigationOptions = { ...headerTransparent }

  camera = null;

  takePhoto = async () => {
    const image = await this.camera.capture();

    this.props.navigation.navigate('PhotoPreview', { imageURI: image.mediaUri });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(camera) => { this.camera = camera; }}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
        >
          <Touchable onPress={this.takePhoto}>
            <View style={styles.takePhotoBtn}>
              <Icon
                style={{ backgroundColor: 'transparent' }}
                name="camera-alt"
                size={52}
                color={palette[0]}
              />
            </View>
          </Touchable>
        </Camera>
      </View>
    );
  }
}

export default CameraScreen;
