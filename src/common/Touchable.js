/** @module src/common/Touchable */

import React, { Component } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { palette } from './styles';

/**
 * Wrapper for TouchableFeedback component for ios.
 * @extends Component
 */
class Touchable extends Component {
  render() {
    return(
        <TouchableOpacity
          style={this.props.style}
          onPress={this.props.onPress}
          disabled={this.props.disabled}
        >
          {this.props.children}
        </TouchableOpacity>
      );
  }
}

Touchable.defaultProps = {
  borderless: false,
  disabled: false,
  onPress() { }
};

export default Touchable;
