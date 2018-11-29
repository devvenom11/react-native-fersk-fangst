/** @module src/market/product/ProductFormScreenHeader */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette, header } from '../../common/styles';
import { getStateParam, platform } from '../../common/helpers';
import HeaderButton from '../../common/HeaderButton';

/*
 * Header for ProductFormScreen.
 * @extends React.PureComponent
 */
class ProductFormScreenHeader extends Component {
  showDeleteConfirm = () => {
    this.props.navigation.setParams({ isProductDeleteConfirmVisible: true });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={header.default}>
        <HeaderButton onPress={this.goBack}>
          <Icon name="arrow-back" size={22} color={palette[0]} />
        </HeaderButton>
        <Text style={header.text}>Lag annonse</Text>
        {
          getStateParam(this.props.navigation, 'isEditMode', false) ?
          <View style={header.sectionRight}>
            <HeaderButton onPress={this.showDeleteConfirm}>
              <Icon name="delete" size={22} color={palette[0]} />
            </HeaderButton>
          </View>
          :
          <View style={{padding: (platform.ios ? 18 : 22)}}/>
        }
      </View>
    );
  }
}

export default ProductFormScreenHeader;
