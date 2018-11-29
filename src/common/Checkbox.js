/** @module src/chat/Checkbox */

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from './styles';
import styles from './Checkbox.styles';

/**
 * Component for checkbox input.
 * @extends Component
 */
class Checkbox extends Component {
  onPress = () => {
    this.props.onPress(!this.props.checked);
  }

  render() {
    const { checked, checkedColor, defaultColor } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        {checked ? (
          <View>
            <Icon name="check-box" size={22} color={checkedColor} />
            <View style={styles.checkedBG} />
          </View>
        ) : (
          <Icon name="check-box-outline-blank" size={22} color={defaultColor} />
        )}
      </TouchableWithoutFeedback>
    );
  }
}

Checkbox.defaultProps = {
  checked: false,
  defaultColor: palette[5],
  checkedColor: palette[2],
  onPress() {}
};

export default Checkbox;
