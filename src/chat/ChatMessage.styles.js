/** @module src/chat/ChatMessage.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

const container = {
  flexDirection: 'row',
  paddingHorizontal: 10,
  paddingBottom: 10
};

const bubbleText = {
  fontSize: 16,
  lineHeight: 18,
  padding: 10
};

const bubblePointer = {
  backgroundColor: 'transparent',
  borderBottomColor: 'transparent',
  borderBottomWidth: 5,
  borderStyle: 'solid',
  borderTopWidth: 5,
  width: 5
};

const info = {
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row'
};

/**
 * Stylesheet for ChatMessage.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  containerOwn: {
    ...container,
    justifyContent: 'flex-end'
  },
  containerCompanion: {
    ...container,
    justifyContent: 'flex-start'
  },
  bubble: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  bubbleShadow: {
    backgroundColor: `${palette[1]}10`,
    maxWidth: '99%',
    paddingBottom: 5
  },
  bubbleTextOwn: {
    ...bubbleText,
    backgroundColor: palette[0],
    borderTopRightRadius: 0,
    color: palette[3]
  },
  bubbleTextCompanion: {
    ...bubbleText,
    backgroundColor: palette[2],
    borderTopLeftRadius: 0,
    color: palette[0]
  },
  bubblePointerOwn: {
    ...bubblePointer,
    borderLeftColor: palette[0],
    borderRightColor: 'transparent',
    borderRightWidth: 5,
    borderTopColor: palette[0]
  },
  bubblePointerCompanion: {
    ...bubblePointer,
    borderLeftColor: 'transparent',
    borderLeftWidth: 5,
    borderRightColor: palette[2],
    borderTopColor: palette[2]
  },
  infoOwn: {
    ...info,
    justifyContent: 'flex-end',
    paddingRight: 5,
    paddingTop: 2
  },
  infoCompanion: {
    ...info,
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingTop: 2
  },
  infoText: {
    color: palette[3],
    fontSize: 13,
    marginRight: 5,
    backgroundColor: 'transparent'
  }
});

export default styles;

