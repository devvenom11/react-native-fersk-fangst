import React, { Component } from 'react';
import { View } from 'react-native';

import Touchable from './Touchable';
import { header } from './styles';

/**
 * Wrapper for Touchable component for header bar buttons.
 * @extends Component
 */
class HeaderButton extends Component {
  render() {
    return (
      <Touchable
        borderless
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <View style={header.item}>
          {this.props.children}
        </View>
      </Touchable>
    );
  }
}

HeaderButton.defaultProps = {
  disabled: false,
  onPress() {}
};

export default HeaderButton;
