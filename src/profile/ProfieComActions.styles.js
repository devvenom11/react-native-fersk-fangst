/** @module src/profile/ProfileComActions.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for ProfileComActions.
 * @type {StyleSheet}
 */

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[2],
    flexDirection: 'row',
    elevation: 5,
    height: 45
  },
  delimiter: {
    borderLeftColor: `${palette[1]}16`,
    borderLeftWidth: 2
  },
  action: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15
  },
  actionTitle: {
    color: palette[0],
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15
  }
});

export default styles;

