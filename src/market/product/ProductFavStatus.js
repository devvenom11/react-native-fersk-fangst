/** @module src/market/product/ProductFavStatus */

import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from '@remobile/react-native-toast';

import { palette } from '../../common/styles';
import Touchable from '../../common/Touchable';
import productService from './productService';

/**
 * component for toggleable marker of product favorite status
 * @extends React.PureComponent
 */
class ProductFavStatus extends Component {
  constructor(props) {
    super(props);

    this.state = { isFavorite: props.isFavorite };

    this.favStatusRequest = null;
  }

  componentWillUnmount() {
    if (this.favStatusRequest != null) {
      this.favStatusRequest.abort();
    }
  }

  toggleFavStatus = async () => {
    if (this.favStatusRequest == null) {
      this.favStatusRequest = productService.toggleFavStatus(this.props.productId);
    }

    this.favStatusRequest.abort();

    try {
      await this.favStatusRequest.run();

      const isFavorite = !this.state.isFavorite;

      this.setState({ isFavorite });
      this.props.onStatusToggle(isFavorite);
    } catch (e) {
      Toast.show(e.toString(), 2000);
    }
  }

  render() {
    return (
      <Touchable onPress={this.toggleFavStatus} borderless={this.props.borderless}>
        <View style={this.props.containerStyle}>
          <Icon
            name={this.state.isFavorite ? 'star' : 'star-border'}
            size={22}
            color={palette[this.state.isFavorite ? 7 : 0]}
          />
        </View>
      </Touchable>
    );
  }
}

ProductFavStatus.defaultProps = {
  isFavorite: false,
  productId: 0,
  borderless: false,
  onStatusToggle() { }
};

export default ProductFavStatus;
