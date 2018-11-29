/** @module src/common/Button */

import React, { Component } from 'react';
import { View } from 'react-native';

import Touchable from './Touchable';
import styles from './Button.styles';

/**
 * Button-wrapper for Touchable component.
 * @extends Component
 */

class Button extends Component {
  render() {
    const buttonStyle = [
      styles.default,
      this.props.disabled && styles.disabled,
      this.props.buttonStyle
    ];

    return (
      <Touchable
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={buttonStyle}>
          {this.props.children}
        </View>
      </Touchable>
    );
  }
}

Button.defaultProps = {
  disabled: false,
  ripleVariant: 'dark',
  buttonStyle: {},
  onPress() {}
};

export default Button;
