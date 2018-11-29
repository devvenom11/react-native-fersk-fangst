/** @module src/market/product/ProductCards.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for ProductCards list component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 100,
    justifyContent: 'flex-start'
  },
  containerHorizontal: {
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  loadIndicator: {
    alignItems: 'center',
    backgroundColor: palette[4],
    bottom: 1,
    justifyContent: 'flex-start',
    left: 0,
    padding: 15,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  updateIndicator: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    padding: 15
  }
});

export default styles;

