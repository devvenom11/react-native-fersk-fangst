/** @module src/chat/Dialog */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from '../common/styles';
import Touchable from '../common/Touchable';
import Checkbox from '../common/Checkbox';
import ProfileImage from '../profile/ProfileImage';
import dialogsScreenModes from './dialogsScreenModes';
import styles from './Dialog.styles';

const modes = {
  default: dialogsScreenModes.default,
  select: dialogsScreenModes.select
};

/**
 * Component for dialog entry in dialogs list.
 * @extends Component
 */
class Dialog extends Component {
  onPress = () => {
    this.props.onPress(this.props.dialog);
  };

  onSelect = (selected) => {
    this.props.onSelect(this.props.dialog, selected);
  };

  render() {
    const { name, image, message, isRead, isOwn } = this.props.dialog;
    const { selected, mode } = this.props;

    return (
      <Touchable onPress={this.onPress}>
        <View style={styles.container}>
          {(!isOwn && !isRead) && (
            <Icon name="fiber-manual-record" size={22} color={palette[2]} style={styles.readMark} />
          )}
          <ProfileImage image={image === 'image' ? null : image} imageStyle={styles.image} />
          <View style={styles.body}>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{name}</Text>
              <Text style={styles.message} numberOfLines={1}>{message}</Text>
            </View>
            {mode !== modes.default && (
              <View style={styles.select}>
                <Checkbox checked={selected} onPress={this.onSelect} />
              </View>
            )}
          </View>
        </View>
      </Touchable>
    );
  }
}

Dialog.defaultProps = {
  dialog: { uid: 0, name: '', message: '', image: null, isRead: false },
  mode: 0,
  selected: false,
  onPress() { },
  onSelect() { }
};

export default Dialog;
