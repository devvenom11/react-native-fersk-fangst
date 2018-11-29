/** @module src/auth/SeccessRegScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for SeccessRegScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  scrollContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15
  },
  content: {
    alignItems: 'center',
    maxWidth: 400
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonText: {
    color: palette[0],
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    marginHorizontal: 15
  }
});

export default styles;
