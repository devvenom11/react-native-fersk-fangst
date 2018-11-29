/** @module src/chat/Checkbox.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for Checkbox.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  checkedBG: {
    backgroundColor: palette[0],
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    left: 5,
    width: 15,
    height: 15,
    zIndex: -1
  }
});

export default styles;

