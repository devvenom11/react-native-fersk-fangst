/** @module src/market/map/ProductMarker */

import React, { Component } from 'react';
import MapView from 'react-native-maps';

/**
 * Component for product marker for map inside Market.
 * @extends React.PureComponent
 */
class ProductMarker extends Component {
  onPress = () => {
    this.props.onPress(this.props.product);
  };

  render() {
    const { product, active } = this.props;
    const image = active ? (product.markers ? product.markers.active : null) : (product.markers ? product.markers.default : null);

    return <MapView.Marker coordinate={product.coords} image={image} zIndex={active ? 1 : 0} onPress={this.onPress} />;
  }
}

ProductMarker.defaultProps = {
  product: {
    coords: { latitude: 0, longitude: 0 },
    markers: { default: null, active: null }
  },
  active: false,
  onPress() { }
};

export default ProductMarker;
