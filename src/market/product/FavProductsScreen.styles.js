/** @module src/market/product/FavProductsScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';


/**
 * Stylesheet for FavProductsScreen component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  activityIndicator: {
    alignSelf: 'center',
    backgroundColor: palette[0],
    borderRadius: 50,
    position: 'absolute',
    top: 40,
    zIndex: 1
  }
});

export default styles;

