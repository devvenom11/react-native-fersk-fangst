/** @module src/common/EmailField */

import React, { Component } from 'react';

import { isString } from './helpers';
import TextField from './TextField';

/**
 * Wrapper on src/common/TextField for Email.
 * @extends Component
 */
class EmailField extends Component {
  render() {
    return (
      <TextField
        {...this.props}
        label={isString(this.props.label) ? this.props.label : 'E-post'}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    );
  }
}

export default EmailField;
