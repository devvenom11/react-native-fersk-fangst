/** @module src/common/Button.styles */

import { StyleSheet } from 'react-native';

import { palette } from './styles';
import { platform } from './helpers';

/**
 * Stylesheet for Button component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  default: {
    alignItems: 'center',
    backgroundColor: palette[2],
    borderRadius: 2,
    justifyContent: 'center',
    padding: 10
  },
  disabled: (platform.ios ?
    {
      borderColor: palette[5],
      borderWidth: 1,
      backgroundColor: palette[3]
    } :
    {
      backgroundColor: palette[5]
    }
  )
});

export default styles;
