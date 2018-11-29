/** @module src/market/product/ProductCard */

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Touchable from '../../common/Touchable';
import Checkbox from '../../common/Checkbox';
import { palette, shadow } from '../../common/styles';
import { productUnit } from '../../common/helpers';
import ProductFavStatus from './ProductFavStatus';
import styles from './ProductCard.styles';

/**
 * Product card component for list of market products.
 * @extends React.PureComponent
 */
class ProductCard extends Component {
  static selectionToggle = 'selection';
  static favToggle = 'fav-status';

  onPress = () => {
    this.props.onPress(this.props.product);
  };

  onFavToggle = (isFav) => {
    this.props.onFavToggle(this.props.product, isFav);
  };

  toggleSelection = () => {
    this.props.onSelect(this.props.product.id);
  };

  toolbarGradient = [palette[3], 'transparent'];

  render() {
    const { product, selected } = this.props;

    return (
      <Touchable onPress={this.onPress}>
        <View style={[styles.card, shadow]}>
          <View>
            <LinearGradient
              colors={this.toolbarGradient}
              style={styles.toolbar}
            >
              <View style={styles.toolbarLeft}>
                {product.debOne && (
                  <Image source={require('./img/debio-one.png')} style={styles.debioIcon} />
                )}
                {product.debTwo && (
                  <Image source={require('./img/debio-two.png')} style={styles.debioIcon} />
                )}
              </View>
              {this.props.toggleType === ProductCard.selectionToggle && (
                <View style={styles.toolbarRight}>
                  <Checkbox checked={selected} defaultColor={palette[0]} onPress={this.toggleSelection} />
                </View>
              )}
              {this.props.toggleType === ProductCard.favToggle && (
                <View style={styles.toolbarRight}>
                  <ProductFavStatus
                    isFavorite={product.isFavorite}
                    productId={product.id}
                    borderless
                    onStatusToggle={this.onFavToggle}
                  />
                </View>
              )}
            </LinearGradient>
            <View style={styles.imageContainer} colors={this.toolbarGradient}>
              {product.image != null ? (
                <Image source={{ uri: product.image }} resizeMethod="resize" style={styles.image} />
              ) : (
                  <Image
                    source={require('./img/image-placeholder.png')}
                    resizeMethod="resize"
                    style={styles.imagePlaceholder}
                  />
                )}
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.infoTop}>
              <Text style={styles.infoText} numberOfLines={1}>
                {product.address ? product.address : ' '}
              </Text>
            </View>
            <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
            <View style={styles.infoBottom}>
              <Text style={styles.price} ellipsizeMode="middle" numberOfLines={1}>
                {Math.round(product.price * 100) / 100}&nbsp;&nbsp;NOK&nbsp;
              </Text>
              <Text style={styles.infoText}>/&nbsp;{productUnit(product.unit)}</Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

ProductCard.defaultProps = {
  product: {
    id: 0,
    image: null,
    title: '',
    price: 0,
    unit: 0,
    isFavorite: false
  },
  toggleType: '',
  selected: false,
  onFavToggle() { },
  onPress() { },
  onSelect() { }
};

export default ProductCard;
