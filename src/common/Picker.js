/** @module src/common/Picker */

import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';

/**
 * Wrapper component for React Native Picker.
 * @extends Component
 */
class Picker extends Component {
  onValueChange = (value, idx) => {
    this.props.onValueChange(this.props.name, value, idx);
  }

  render() {
    const { items, selectedValue, label, style, dropdownPosition } = this.props
    return (
      <Dropdown
        label={label}
        value={items[selectedValue] ? items[selectedValue].value : null}
        data={items}
        containerStyle={style}
        inputContainerStyle={{ borderBottomColor: 'transparent' }}
        dropdownOffset={{ top: 15, left: 0 }}
        onChangeText={this.onValueChange.bind(this)}
        dropdownPosition={dropdownPosition}
      />
      //<RNPicker {...this.props} onValueChange={this.onValueChange}>
      //  {this.props.items.map(this.renderItem)}
      //</RNPicker>
    );
  }
}

Picker.defaultProps = {
  name: '',
  label: '',
  selectedValue: 0,
  items: [],
  style: {},
  onValueChange() { }
};

export default Picker;
