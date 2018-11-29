/** @module src/settings/ChangeEmailScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for ChangeEmailScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  scrollContainer: {
    minHeight: '100%'
  },
  fields: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  info: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50
  },
  infoText: {
    color: palette[5],
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center'
  },
  controls: {
    justifyContent: 'flex-end'
  },
  activityIndicator: {
    height: 80,
    justifyContent: 'center',
    width: '100%'
  },
  submitButton: {
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

