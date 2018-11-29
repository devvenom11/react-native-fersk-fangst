/** @module src/market/product/banner.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for banner component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  banner: {
    backgroundColor: palette[0],
    borderRadius: 2,
    elevation: 3,
    marginHorizontal: 5,
    minHeight: 200
  },
  image: {
    paddingTop: '50%',
    width: '100%',
    backgroundColor: 'white'
  }
});

export default styles;

