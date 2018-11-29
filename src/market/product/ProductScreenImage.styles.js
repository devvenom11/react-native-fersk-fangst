/** @module src/market/product/ProductScreenImage.styles */

import { StyleSheet } from 'react-native';

/**
 * Stylesheet for ProductScreenImage.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 240
  },
  placeholder: {
    height: 96,
    width: 96
  },
  gradient: {
    ...(StyleSheet.flatten(StyleSheet.absoluteFillObject))
  }
});

export default styles;

