/** @module src/common/Modal */

import React, { Component } from 'react';
import { View, Modal as RNModal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from './styles';
import Touchable from './Touchable';
import styles from './Modal.styles';

/**
 * Wrapper Component for React Native Modal.
 * @extends Component
 */
class Modal extends Component {
  static DeclineButton = ({ onPress }) => (
    <Touchable onPress={onPress}>
      <View style={styles.declineButton}>
        <Icon name="close" size={28} />
      </View>
    </Touchable>
  )

  static AcceptButton = ({ onPress }) => (
    <Touchable onPress={onPress}>
      <View style={styles.acceptButton}>
        <Icon name="check" size={28} color={palette[2]} />
      </View>
    </Touchable>
  )

  static ActivityIndicator = () => <ActivityIndicator animate size="large" style={styles.activityIndicator} />

  static styles = {
    text: styles.text,
    controls: styles.controls
  }

  render() {
    const props = {
      animationType: 'fade',
      transparent: true,
      ...this.props
    };

    return (
      <RNModal {...props}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={props.onRequestClose}>
            <View style={[styles.background, props.backgroundStyle]} />
          </TouchableWithoutFeedback>
          <View style={[styles.body, props.bodyStyle]}>
            <View style={[styles.content, props.contentStyle]}>{props.content}</View>
            {props.controls == null ? (
              <View style={styles.controls}>
                <Modal.AcceptButton onPress={props.onRequestClose} />
              </View>
            ) : props.controls}
          </View>
        </View>
      </RNModal>
    );
  }
}

Modal.defaultProps = {
  onRequestClose() {}
};

export default Modal;
