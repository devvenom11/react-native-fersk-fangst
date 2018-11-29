/** @module src/common/TextField */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TextField as RNMaterailTextField } from 'react-native-material-textfield';

import { palette } from './styles';
import { isString } from './helpers';

/**
 * Stylesheet for TextField wrapper component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: palette[3],
    borderBottomWidth: 1,
    marginTop: 0
  }
});

/**
 * Wrapper component for TextField from react-native-material-textfield.
 * Provides custom property 'name' wich will be called in custom wrapper for onChangeText callback
 * @extends Component
 */
class TextField extends Component {
  onChangeText = (value) => {
    this.props.onChangeText(this.props.name, value);
  }

  render() {
    return (
      <RNMaterailTextField
        animationDuration={0}
        inputContainerStyle={styles.inputContainer}
        tintColor={palette[2]}
        labelHeight={30}
        baseColor={palette[5]}
        autoCapitalize="sentences"
        {...this.props}
        value={isString(this.props.value) ? this.props.value : ''}
        onChangeText={this.onChangeText}
      />
    );
  }
}

TextField.defaultProps = {
  name: '',
  onChangeText() {}
};

export default TextField;
