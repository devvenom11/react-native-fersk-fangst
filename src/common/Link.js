/** @module src/common/Link */

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Linking
} from 'react-native';

import { palette } from './styles';

/**
 * Stylesheet for Link component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  link: {
    color: palette[2],
    textDecorationLine: 'underline'
  }
});

/**
 * Component for hyperlinks.
 * @extends Component
 */
class Link extends Component {
  onPress = () => {
    if (typeof this.props.onPress !== 'function') {
      Linking.openURL(this.props.url);
    } else {
      this.props.onPress();
    }
  };

  render() {
    return (
      <Text
        style={[styles.link, this.props.linkStyle]}
        onPress={this.onPress}
      >
        {this.props.children}
      </Text>
    );
  }
}

Link.defaultProps = {
  url: ''
};

export default Link;
