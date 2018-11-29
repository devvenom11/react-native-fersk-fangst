/** @module src/chat/ChatMessage */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette, shadow } from '../common/styles';
import styles from './ChatMessage.styles';

/**
 * Component for chat message.
 * @extends Component
 */
class ChatMessage extends Component {
  render() {
    const { isOwn, isSent, text, time } = this.props;

    return (
      <View style={isOwn ? styles.containerOwn : styles.containerCompanion}>
        <View>
          <View style={styles.bubble}>
            {!isOwn && <View style={styles.bubblePointerCompanion} />}
            {/* <View style={styles.bubbleShadow}> */}
            <Text selectable style={[isOwn ? styles.bubbleTextOwn : styles.bubbleTextCompanion, shadow]}>{text}</Text>
            {/* </View> */}
            {isOwn && <View style={styles.bubblePointerOwn} />}
          </View>
          <View style={isOwn ? styles.infoOwn : styles.infoCompanion}>
            <Text style={styles.infoText}>{time.format('LT')}</Text>
            {isOwn && <Icon name={isSent ? 'check' : 'access-time'} size={13} color={palette[3]} />}
          </View>
        </View>
      </View>
    );
  }
}

ChatMessage.defaultProps = {
  isOwn: true,
  isSent: false,
  text: ''
};

export default ChatMessage;
