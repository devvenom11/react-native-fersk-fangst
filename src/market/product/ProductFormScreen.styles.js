/** @module src/market/product/ProductFormScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for ProductFormScreen component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  scrollContainer: {
    paddingTop: 15
  },
  images: {
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
    width: 110
  },
  activityIndicator: {
    height: 130,
    justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: palette[0],
    paddingVertical: 20
  },
  cancelButtonText: {
    color: palette[2],
    fontSize: 16,
    lineHeight: 24
  },
  submitButton: {
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24
  }
});

export default styles;
