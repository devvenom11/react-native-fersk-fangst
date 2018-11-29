/** @module src/market/category/CategoryScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for CategoryScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: palette[0],
    borderRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    height: 48,
    marginBottom: 15,
    marginHorizontal: 10,
    marginTop: -30,
    zIndex: 1
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48
  },
  searchField: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24
  },
  mapLauncher: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: palette[2],
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    justifyContent: 'center',
    width: 50
  },
  time: {
    paddingRight: 10,
    color: palette[1],
    paddingTop: 0,
    fontSize: 12,
    textAlign: 'right'
  },
});


export default styles;

