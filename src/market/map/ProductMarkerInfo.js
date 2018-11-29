/** @module src/market/map/ProductMarkerInfo */

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { productUnit } from '../../common/helpers';
import { palette, shadow } from '../../common/styles';
import Touchable from '../../common/Touchable';
import styles from './ProductMarkerInfo.styles';

/**
 * Component for product info for map inside Market.
 * @extends React.PureComponent
 */
class ProductMarkerInfo extends Component {
  onPress = () => {
    this.props.onPress(this.props.product);
  };

  render() {
    const { product, centered, onClose } = this.props;

    return (
      <View style={[centered ? styles.containerCentered : styles.containerSided, shadow]}>
        <View style={[styles.header, { justifyContent: 'flex-end' }]}>
          <Touchable onPress={onClose}>
            <Icon name="close" size={24} color={palette[0]} />
          </Touchable>
        </View>
        <Touchable onPress={this.onPress}>
          <View style={styles.body}>
            {product.image != null ? (
              <Image source={{ uri: product.image }} resizeMethod="resize" style={styles.image} />
            ) : (
              <Image
                source={require('./../product/img/image-placeholder.png')}
                resizeMethod="resize"
                style={styles.imagePlaceholder}
              />
              )}
            <View style={styles.info}>
              <View style={styles.infoRow}>
                {product.debOne && (
                  <Image source={require('../product/img/debio-one.png')} style={styles.debioIcon} />
                )}
                {product.debTwo && (
                  <Image source={require('../product/img/debio-two.png')} style={styles.debioIcon} />
                )}
                <Text style={styles.descriptionText} numberOfLines={1}>{product.address ? product.address : ' '}</Text>
              </View>
              <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.price} ellipsizeMode="middle" numberOfLines={1}>
                  {Math.round(product.price * 100) / 100}&nbsp;&nbsp;NOK&nbsp;
                </Text>
                <Text style={styles.unit}>/&nbsp;{productUnit(product.unit)}</Text>
              </View>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

ProductMarkerInfo.defaultProps = {
  product: {
    address: '',
    price: '',
    unit: 0,
    title: '',
    image: null,
    debOne: false,
    debTwo: false
  },
  centered: true,
  onPress() { },
  onClose() { }
};

export default ProductMarkerInfo;
