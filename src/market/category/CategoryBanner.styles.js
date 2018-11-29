/** @module src/market/product/CategoryBanner.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for CategoryBanner.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 220
  },
  image: {
    ...StyleSheet.flatten(StyleSheet.absoluteFillObject),
    height: '100%',
    width: '100%',
    zIndex: 0
  },
  overlay: {
    backgroundColor: `${palette[1]}50`,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 60,
    zIndex: 1
  },
  title: {
    color: palette[0],
    fontSize: 24,
    lineHeight: 32,
    marginTop: 20
  }
});

export default styles;

