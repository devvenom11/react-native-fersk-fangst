/** @module src/common/PhoneField */

import React, { Component } from 'react';
import PhoneInput from "react-native-phone-input";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { isString } from './helpers';
import TextField from './TextField';

/**
 * Wrapper on src/common/TextField for phone number.
 * @extends Component
 */
class PhoneField extends Component {

  onChangeText = (value) => {
    this.props.onChangeText("phone", value);
  };

  render() {
    return (
        <PhoneInput style={styles.separator}
          ref={ref => {
            this.phone = ref;
          }}
          onChangePhoneNumber={this.onChangeText}
          value={this.props.value}
        />
    );
  }
}

PhoneField.defaultProps = {
  name: '',
  value: '',
  onChangeText() {}
};

var styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
});

export default PhoneField;
