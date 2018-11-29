/** @module src/common/Switch */

import React, { Component } from 'react';
import { Switch as RNSwitch } from 'react-native-switch'

/**
 * Wrapper component for React Native Switch.
 * @extends Component
 */
class Switch extends Component {
  onValueChange = (value, idx) => {
    this.props.onValueChange(this.props.name, value, idx);
  }

  render() {
    return (
      <RNSwitch {...this.props} onValueChange={this.onValueChange} />
    );
  }
}

Switch.defaultProps = {
  name: '',
  onValueChange() {}
};

export default Switch;
