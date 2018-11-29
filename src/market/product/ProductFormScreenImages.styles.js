/** @module src/market/product/ProductFormScreenImages.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for ProductFormScreenImages
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  addImageButton: {
    alignItems: 'center',
    backgroundColor: palette[4],
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 15,
    height: 110,
    width: 110,
    borderRadius: 55,
  }
});

export default styles;
