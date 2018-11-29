/** @module src/market/subcategory/SubcategoryCardList.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for SubcategoryCardList.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subcategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 15,
    paddingHorizontal: 5
  },
  activityIndicator: {
    ...StyleSheet.flatten(StyleSheet.absoluteFill),
    backgroundColor: palette[4],
    zIndex: 1
  }
});


export default styles;

