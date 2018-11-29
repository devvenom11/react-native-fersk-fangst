/** @module src/common/PasswordField */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from './styles';
import TextField from './TextField';
import Touchable from './Touchable';

/**
 * Wrapper on top of TextField for password input.
 * @extends Component
 */
class PasswordField extends Component {
  constructor(props) {
    super(props);

    this.state = { isVisible: false };
  }

  onChangeText = (value) => {
    this.props.onChangeText(this.props.name, value);
  };

  toggleVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  renderVisibilityToggler = () => (
    <Touchable onPress={this.toggleVisibility}>
      <Icon name={this.state.isVisible ? 'visibility' : 'visibility-off'} size={22} color={palette[5]} />
    </Touchable>
  );

  render() {
    return (
      <TextField
        {...this.props}
        autoCapitalize="none"
        secureTextEntry={!this.state.isVisible}
        renderAccessory={this.renderVisibilityToggler}
      />
    );
  }
}

PasswordField.defaultProps = {
  name: '',
  label: 'Passord'
};

export default PasswordField;
