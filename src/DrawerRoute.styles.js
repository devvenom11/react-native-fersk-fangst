/** @module src/DrawerRoute.styles */

import { StyleSheet } from 'react-native';
import { palette } from './common/styles';

/**
 * Stylesheet for Drawer route link component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  route: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  routeWithoutIcon: {
    paddingLeft: 35
  },
  routeLabel: {
    color: `${palette[3]}40`,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    marginLeft: 15
  },
  routeLabelActive: {
    color: palette[3]
  }
});

export default styles;
