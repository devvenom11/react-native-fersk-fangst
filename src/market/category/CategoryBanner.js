/** @module src/market/category/CategoryBanner.js */

import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import styles from './CategoryBanner.styles';

/**
 * Component for banner in category screen.
 * @extends React.PureComponent
 */
class CategoryBanner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.image} resizeMethod="scale" style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

CategoryBanner.defaultProps = {
  image: null,
  title: ''
};

export default CategoryBanner;
