import { StyleSheet, StatusBar } from 'react-native';

import { platform } from './helpers';

export const palette = [
  '#FFFFFF', // 0
  '#000000', // 1
  '#1AC9BB', // 2
  '#646B77', // 3
  '#E9E9EF', // 4
  '#B6BAC2', // 5
  '#D50000', // 6
  '#FFAC1A' // 7
];

export const statusBarHeight = (platform.ios ? 20 : StatusBar.currentHeight);

// From https://github.com/react-community/react-navigation/blob/master/src/views/Header/Header.js#L46
export const headerHeight = platform.ios ? 44 : 56;

export const header = StyleSheet.create({
  default: {
    backgroundColor: palette[3],
    flexDirection: 'row',
    height: headerHeight + statusBarHeight,
    paddingTop: statusBarHeight,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  transparent: {
    backgroundColor: `${palette[1]}01`,
    elevation: 0,
    flex: 1,
    flexDirection: 'row',
    left: 0,
    height: headerHeight,
    position: 'absolute',
    right: 0,
    top: statusBarHeight,
    zIndex: 1,
    borderBottomWidth: 0
  },
  sticky: {
    backgroundColor: palette[3],
    flex: 1,
    minHeight: headerHeight + statusBarHeight,
    // From https://github.com/react-community/react-navigation/blob/master/src/views/Header/Header.js#L47
    // paddingLeft: (platform.ios ? 70 : 56),
    // paddingTop: statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionLeft: {
    flexDirection: 'row',
    marginRight: 'auto'
  },
  sectionRight: {
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  item: {
    // From https://github.com/react-community/react-navigation/blob/master/src/views/Header/HeaderBackButton.js
    padding: (platform.ios ? 12 : 16)
  },
  text: {
    color: palette[0],
    // From https://github.com/react-community/react-navigation/blob/master/src/views/Header/HeaderTitle.js
    fontSize: (platform.ios ? 17 : 20),
    fontWeight: (platform.ios ? '600' : '500')
  }
});

export const shadow = {
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 2
}

export const headerDefault = {
  headerStyle: header.default,
  headerTintColor: palette[0]
};

export const headerTransparent = {
  headerStyle: header.transparent,
  headerTintColor: palette[0]
};

export const placeholders = StyleSheet.create({
  emptyComponentText: {
    color: palette[3],
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 15,
    textAlign: 'center'
  }
});

export default palette;
