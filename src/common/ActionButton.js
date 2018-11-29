/** @module src/common/ActionButton */

import React, { Component } from 'react';
import { View } from 'react-native';

import Touchable from './Touchable';
import styles from './ActionButton.styles';

/**
 * Action Material design button.
 * @extends Component
 */
class ActionButton extends Component {
  onPress = () => {
    this.props.onPress();
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Touchable borderless onPress={this.onPress}>
          <View style={styles.button}>
            {this.props.children}
          </View>
        </Touchable>
      </View>
    );
  }
}

ActionButton.defaultProps = {
  onPress() {},
  containerStyle: {}
};

export default ActionButton;
