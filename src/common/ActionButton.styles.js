/** @module src/common/ActionButton.styles */

import { StyleSheet } from 'react-native';

import { palette } from './styles';

/**
 * Stylesheet for ActionButton component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    bottom: 15,
    borderRadius: 50,
    elevation: 10,
    position: 'absolute',
    right: 15,
    zIndex: 100
  },
  button: {
    alignItems: 'center',
    backgroundColor: palette[2],
    borderRadius: 50,
    justifyContent: 'center',
    padding: 15
  }
});

export default styles;
