/** @module src/auth/PasswordResetScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';
import { platform } from '../common/helpers';

/**
 * Stylesheet for PasswordResetScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  scrollContainer: {
    alignItems: 'center',
    minHeight: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  infoText: {
    color: palette[5],
    fontSize: 16,
    lineHeight: 24
  },
  emailField: {
    ...(platform.ios ?
      {
        fontSize: 16,
        lineHeight: 24
      } :
      {
        fontSize: 14,
        lineHeight: 16
      }
    )
  },
  activityIndicator: {
    height: 80,
    minWidth: '100%',
    justifyContent: 'center'
  },
  submitButton: {
    marginTop: 30,
    minWidth: '100%',
    paddingVertical: 10
  },
  buttonText: {
    color: palette[0],
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24
  }
});

export default styles;
