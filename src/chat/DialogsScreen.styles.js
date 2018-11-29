/** @module src/chat/DialogsScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for DialogsScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 15
  },
  processingIndicator: {
    ...(StyleSheet.flatten(StyleSheet.absoluteFillObject)),
    backgroundColor: `${palette[0]}50`,
    justifyContent: 'flex-start',
    padding: 15,
    zIndex: 1
  },
  titleView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  title: {
    paddingLeft: 8,
    paddingRight: 5,  
    paddingTop: 0,
    color: palette[2],
    fontSize: 19,
    textAlign: 'left'
  },
  time: {
    paddingRight: 10,
    color: palette[1],
    paddingTop: 0,
    fontSize: 12,
    textAlign: 'right'
  },
  message: {
    padding: 5,
    color: palette[1],
    fontSize: 14,
    textAlign: 'left'
  }
});

export default styles;

