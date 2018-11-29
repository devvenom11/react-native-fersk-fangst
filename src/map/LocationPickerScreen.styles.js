/** @module src/map/LocationPickerScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for LocationPickerScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  addressBar: {
    alignItems: 'center',
    backgroundColor: palette[0],
    borderRadius: 4,
    alignSelf: 'center',
    elevation: 5,
    marginHorizontal: 15,
    maxWidth: 500,
    minWidth: 200,
    padding: 15,
    position: 'absolute',
    top: 15,
    zIndex: 1
  },
  addressBarIcon: {
    color: palette[2],
    marginRight: 10
  },
  addressBarText: {
    fontSize: 18,
    lineHeight: 24
  },
  addressBarInfo: {
    color: palette[5]
  },
  selectButton: {
    alignSelf: 'center',
    borderRadius: 4,
    bottom: 15,
    elevation: 5,
    marginHorizontal: 15,
    position: 'absolute',
    width: 140,
    zIndex: 1
  },
  selectButtonText: {
    color: palette[0],
    fontSize: 22,
    lineHeight: 26,
    textAlign: 'center'
  }
});

export default styles;

