/** @module src/map/LocationPicker.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for LocationPicker.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  labelDefault: {
    color: palette[5],
    flex: 1,
    fontSize: 16,
    marginRight: 5
  },
  labelTop: {
    color: palette[5],
    fontSize: 12,
    height: 15
  },
  touchable: {
    borderBottomColor: palette[3],
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 5
  },
  input: {
    color: palette[1],
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
    paddingRight: 5
  }
});

export default styles;
