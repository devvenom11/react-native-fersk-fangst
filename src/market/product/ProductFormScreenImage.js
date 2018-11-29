/** @module src/market/product/ProductFormScreenImage */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from '../../common/styles';
import Touchable from '../../common/Touchable';
import styles from './ProductFormScreenImage.styles';

/**
 * Image component for ProductFormScreen
 * @extends React.PureComponent
 */
class ProductFormScreenImage extends Component {
  onDelete = () => {
    this.props.onDelete(this.props.image);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.image }} style={styles.image} />
        <View style={styles.toolbar}>
          <Touchable onPress={this.onDelete}>
            <Icon name="delete" size={18} style={styles.deleteButton} color={palette[0]} />
          </Touchable>
        </View>
      </View>
    );
  }
}

ProductFormScreenImage.defaultProps = {
  image: null,
  index: 0,
  onDelete() {}
};

export default ProductFormScreenImage;
