/** @module src/map/ImageViewerScreenHeader.styles */

import { StyleSheet } from 'react-native';

import { header } from './styles';

/**
 * Stylesheet for ImageViewerScreenHeader.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.flatten(header.default),
    backgroundColor: 'transparent',
    elevation: 0,
    flex: 1,
    left: 0,
    justifyContent: 'flex-start',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});

export default styles;

