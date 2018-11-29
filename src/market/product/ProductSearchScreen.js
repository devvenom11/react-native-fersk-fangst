/** @module src/profile/ProductSearchScreen */

import React, { Component } from 'react';
import { View } from 'react-native';

import { getStateParam, bindComponentRef } from '../../common/helpers';
import authService from '../../auth/authService';
import ProductCards from './ProductCards';
import ProductCard from './ProductCard';
import ProductSearchScreenHeader from './ProductSearchScreenHeader';
// import styles from './ProductSearchScreen.styles';

/**
 * Screen component for a product posts search.
 * @extends React.Component
 */
class ProductSearchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <ProductSearchScreenHeader navigation={navigation} />
  })

  constructor(props) {
    super(props);

    this.state = {
      term: getStateParam(this.props.navigation, 'searchTerm'),
      offset: null,
      limit: 20
    };
  }

  componentDidMount() {
    if (this.state.term != null) {
      this.refsCache.get('products').loadProducts();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ term: getStateParam(nextProps.navigation, 'searchTerm') });
  }

  navToProductScreen = (product) => {
    this.props.navigation.navigate('Product', {
      id: product.id,
      onGoBack: this.refsCache.get('products').refreshProducts
    });
  };

  render() {
    return (
      <ProductCards
        style={{ paddingTop: 10 }}
        params={this.state}
        cardToggleType={authService.isLogged() ? ProductCard.favToggle : ''}
        onCardPress={this.navToProductScreen}
        loadOnMount={false}
        ref={bindComponentRef.call(this, 'products')}
      />
    );
  }
}

export default ProductSearchScreen;
