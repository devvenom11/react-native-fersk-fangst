/** @module src/camera/CameraRollScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for CameraRoll screen component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  imagesContainer: {
    flex: 1,
    minHeight: 100,
    paddingHorizontal: 5,
    paddingVertical: 15
  },
  submitBtnContainer: {
    justifyContent: 'center',
    flex: 1,
    flexBasis: 50,
    flexDirection: 'row',
    flexGrow: 0
  },
  submitBtn: {
    minWidth: '100%',
    // color: palette[0],
    flex: 1
  },
  submitBtnText: {
    color: palette[0],
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24
  },
  imageCard: {
    margin: 5
  },
  imageCardTouchable: {
    flex: 1
  },
  imageCardCheckMark: {
    backgroundColor: palette[2],
    color: palette[0],
    left: 5,
    paddingHorizontal: 5,
    position: 'absolute',
    top: 5
  },
  cameraBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 1,
    backgroundColor: palette[4]
  },
  cameraBtnTouchable: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export default styles;

