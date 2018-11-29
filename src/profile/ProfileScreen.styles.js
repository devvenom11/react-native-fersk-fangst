/** @module src/profile/ProfileScreen.styles */

import { StyleSheet, Dimensions } from 'react-native';

import { palette, header } from '../common/styles';

const tab = {
  alignItems: 'center',
  borderColor: palette[0],
  borderWidth: 2,
  flex: 1,
  justifyContent: 'center',
  padding: 14
};

/**
 * Stylesheet for ProfileScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoContainer: {
    backgroundColor: palette[0]
  },
  map: {
    height: 220
  },
  mapPlaceholder: {
    alignItems: 'center',
    backgroundColor: palette[4],
    flex: 1,
    justifyContent: 'center'
  },
  profile: {
    marginTop: -60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 2
  },
  avatar: {
    height: 88,
    width: 88
  },
  onlineStatus: {
    color: palette[0]
  },
  name: {
    color: palette[0],
    fontSize: 18,
    lineHeight: 24
  },
  nameHeader: {
    ...StyleSheet.flatten(header.text),
    width: '70%'
  },
  location: {
    paddingVertical: 5
  },
  tabs: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10
  },
  tab: {
    flex: 1
  },
  activeTab: {
    flex: 1,
    borderBottomColor: palette[2]
  },
  tabLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2
  },
  newProduct: {
    bottom: '5%'
  },
  stickyHeader: {
    backgroundColor: palette[3],
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 0
  },
  stickyHeaderText: {
    ...StyleSheet.flatten(header.text),
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingHorizontal: 85
  },
  iconInMap: {
    backgroundColor: 'transparent'
  }
});

export default styles;
