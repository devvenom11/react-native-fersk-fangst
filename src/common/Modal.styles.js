/** @module src/common/Modal.styles */

import { StyleSheet } from 'react-native';

import { palette } from './styles';

const button = { padding: 10 };

/**
 * Stylesheet for Modal wrapper component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${palette[1]}90`,
    zIndex: 0
  },
  body: {
    backgroundColor: palette[0],
    marginHorizontal: 15,
    maxWidth: 400,
    padding: 10,
    zIndex: 1
  },
  content: {
    alignItems: 'center',
    maxHeight: 300,
    padding: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 20
  },
  controls: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%'
  },
  dismissButton: {
    ...button,
    // marginRight: 'auto'
  },
  acceptButton: {
    ...button,
    // marginLeft: 'auto'
  },
  activityIndicator: {
    minWidth: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8
  }
});

export default styles;
