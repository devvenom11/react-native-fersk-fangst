/** @module src/camera/CameraScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for camera screen component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  takePhotoBtn: {
    borderColor: palette[0],
    borderRadius: 50,
    borderWidth: 4,
    margin: 5,
    padding: 5
  }
});

export default styles;

