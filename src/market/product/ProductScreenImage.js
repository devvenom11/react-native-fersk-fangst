/** @module src/market/product/ProductScreenImage */

import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { palette } from '../../common/styles';
import Touchable from '../../common/Touchable';
import styles from './ProductScreenImage.styles';

const height = StyleSheet.flatten(styles).container.height;

/*
 * Product image for ProductScreen.
 * @extends React.PureComponent
 */
class ProductScreenImage extends Component {
  onPress = () => {
    this.props.onPress(this.props.index);
  };

  gradient = {
    colors: [palette[3], `${palette[3]}40`, `${palette[3]}30`, `${palette[3]}20`, `${palette[3]}10`],
    start: { x: 1, y: 0 },
    end: { x: 1, y: 1 }
  };

  render() {
    const { image, width } = this.props;

    return (
      <Touchable onPress={this.onPress} disabled={image == null}>
        <View style={[styles.container, { width }]}>
          {image != null ? (
            <Image source={{ uri: image }} resizeMethod="resize" style={{ flex: 1, height, width }} />
          ) : (
              <Image source={require('./img/image-placeholder.png')} resizeMethod="resize" style={styles.placeholder} />
            )}
          <LinearGradient {...this.gradient} style={styles.gradient} />
        </View>
      </Touchable>
    );
  }
}

ProductScreenImage.defaultProps = {
  onPress() { }
};

export default ProductScreenImage;
