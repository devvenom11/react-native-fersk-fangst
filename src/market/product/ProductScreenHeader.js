/** @module src/market/product/ProductScreenHeader */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette, header } from '../../common/styles';
import { getStateParam } from '../../common/helpers';
import HeaderButton from '../../common/HeaderButton';
import ProductFavStatus from './ProductFavStatus';

/*
 * Header for ProductScreen.
 * @extends React.PureComponent
 */
class ProductScreenHeader extends Component {

  gradient = [palette[1], `${palette[1]}10`];

  goBack = () => {
    getStateParam(this.props.navigation, 'goBack', this.props.navigation.goBack)();
  }

  edit = () => {
    const { navigation } = this.props;

    navigation.navigate('ProductForm', {
      isEditMode: true,
      product: getStateParam(navigation, 'product', {}),
      goBackFrom: getStateParam(navigation, 'goBackFrom', navigation.state.key),
      onGoBack: getStateParam(navigation, 'onGoBack', () => { })
    });
  }

  render() {
    const { navigation } = this.props;
    const title = getStateParam(navigation, 'title', '');
    const isEditable = getStateParam(navigation, 'isEditable', false);
    const product = getStateParam(navigation, 'product', {});
    const productLoaded = getStateParam(this.props.navigation, 'productLoaded', false);

    return (
      <View style={productLoaded ? header.transparent : header.default}>
        <View style={header.sectionLeft}>
          <HeaderButton onPress={this.goBack}>
            <Icon name="arrow-back" size={20} color={palette[0]} />
          </HeaderButton>
          {/* {!productLoaded && <Text style={header.text}>{title}</Text>} */}
        </View>
        <View style={header.sectionRight}>
          {productLoaded && (
            <ProductFavStatus
              isFavorite={product.isFavorite}
              productId={product.id}
              borderless
              containerStyle={header.item}
            />
          )}
          {isEditable && (
            <HeaderButton onPress={this.edit}>
              <Icon name="mode-edit" size={20} color={palette[0]} />
            </HeaderButton>
          )}
        </View>
      </View>
    );
  }
}

export default ProductScreenHeader;
