/** @module src/map/MapStatic.styles */

import { StyleSheet } from 'react-native';

/**
 * Stylesheet for MapStatic.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  placeholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  iconInMap: {
    backgroundColor: 'transparent'
  }
});

export default styles;
