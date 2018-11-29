/** @module src/chat/Dialog.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for Dialog.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: palette[0],
    flexDirection: 'row',
    width: '100%'
  },
  readMark: {
    left: 8,
    marginTop: -10,
    position: 'absolute',
    top: '50%',
    zIndex: 1,
    backgroundColor: 'transparent'
  },
  image: {
    margin: 15,
    height: 40,
    width: 40,
    borderRadius: 20
  },
  body: {
    alignItems: 'center',
    borderBottomColor: palette[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15,
    paddingVertical: 15
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  message: {
    fontSize: 16
  },
  select: {
    paddingLeft: 15
  }
});

export default styles;

