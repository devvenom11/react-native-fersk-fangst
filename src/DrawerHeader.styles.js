/** @module src/DrawerHeader.styles */

import { StyleSheet } from 'react-native';
import { palette, statusBarHeight } from './common/styles';

/**
 * Stylesheet for Drawer header component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    borderBottomColor: palette[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%'
  },
  profile: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 130,
    paddingBottom: 15,
    paddingHorizontal: 15,
    paddingTop: statusBarHeight + 15,
    width: '100%'
  },
  profileBG: {
    left: 0,
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  profileImg: {
    marginRight: 15,
    height: 72,
    width: 72,
    borderRadius: 72 / 2
  },
  profileName: {
    backgroundColor: 'transparent',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileLogin: {
    color: palette[2],
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default styles;
