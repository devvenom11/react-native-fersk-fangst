/** @module src/market/product/ProductFormScreenImage.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for ProductFormScreenImage
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    marginLeft: 10
  },
  image: {
    height: 110,
    width: 110
  },
  toolbar: {
    backgroundColor: `${palette[1]}30`,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    left: 0,
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});

export default styles;
