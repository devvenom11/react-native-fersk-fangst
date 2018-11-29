/** @module src/profile/ProductSearchScreenHeader.styles */

import { StyleSheet } from 'react-native';

import { palette, header } from '../../common/styles';

/**
 * Stylesheet for ProductSearchScreenHeader.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.flatten(header.default)
  },
  searchRow: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5
  },
  search: {
    color: palette[0],
    flex: 1,
    fontSize: 16,
    lineHeight: 24
  }
});

export default styles;
