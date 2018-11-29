/** @module src/auth/OAuthScreen.styles */

import { StyleSheet } from 'react-native';

/**
 * Stylesheet for OAuthScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activityIndicator: {
    ...StyleSheet.flatten(StyleSheet.absoluteFillObject),
    padding: 15,
    zIndex: 1
  }
});

export default styles;

