/** @module src/product/ProductFormScreenImages */

import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from '../../common/styles';
import Touchable from '../../common/Touchable';
import ProductFormScreenImage from './ProductFormScreenImage';
import styles from './ProductFormScreenImages.styles';

/**
 * Product image handler for ProductFormScreen
 * @extends React.Component
 */
class ProductFormScreenImages extends Component {
  addImages = async () => {
    const images = [...this.props.images];

    this.props.onChange([
      ...images,
      ...((await this.navToCameraRoll(this.props.max - images.length)).filter(uri => images.indexOf(uri) < 0))
    ]);
  };

  deleteImage = (target) => {
    this.props.onChange(this.props.images.filter(image => image !== target));
  };

  navToCameraRoll = () => (
    new Promise((resolve) => {
      this.props.navigation.navigate('Camera', {
        selectedMaxNum: this.props.max,
        onImageSelect: (images = []) => {
          resolve(images);
        }
      });
    })
  );

  renderImage = image => <ProductFormScreenImage key={image} image={image} onDelete={this.deleteImage} />;

  render() {
    const { images, max } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          {images.map(this.renderImage)}
          {images.length < max && (
            <Touchable onPress={this.addImages}>
              <View style={styles.addImageButton}>
                <Icon name="camera-alt" size={36} color={palette[5]} />
                <Text style={{width: 60, textAlign: 'center'}}>Legg til bilde(r)</Text>
              </View>
            </Touchable>
          )}
        </ScrollView>
      </View>
    );
  }
}

ProductFormScreenImages.defaultProps = {
  images: [],
  max: 0,
  onChange() {}
};


export default ProductFormScreenImages;
