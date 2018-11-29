/** @module src/market/map/MapScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

const categories = {
  alignItems: 'center',
  backgroundColor: palette[0],
  borderRadius: 4,
  alignSelf: 'center',
  elevation: 5,
  flexDirection: 'row',
  marginHorizontal: 15,
  maxWidth: 500,
  minWidth: 250,
  paddingLeft: 15,
  paddingRight: 15,
  position: 'absolute',
  top: 15,
  zIndex: 1
};

/**
 * Stylesheet for MapScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  map: {
    flex: 1
  },
  categoriesCentered: {
    ...categories
  },
  categoriesSided: {
    ...categories,
    left: 10
  },
  categoryPicker: {
    flex: 1,
  }
});

export default styles;
