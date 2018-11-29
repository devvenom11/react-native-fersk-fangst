/** @module src/market/profile/SettingsScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for SettingsScreen component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  section: {
    borderBottomColor: palette[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 15
  },
  sectionLabel: {
    fontSize: 16
  }
});

export default styles;
