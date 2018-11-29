/** @module src/market/product/FavProductsScreen */

import React, { Component } from 'react';
import { View, ActivityIndicator, BackHandler } from 'react-native';
import Toast from '@remobile/react-native-toast';

import { markRouteAsActive } from '../../AppNavigator';
import { getStateParam } from '../../common/helpers';
import productService from './productService';
import ProductCards from './ProductCards';
import ProductCard from './ProductCard';
import FavProductsScreenHeader from './FavProductsScreenHeader';
import styles from './FavProductsScreen.styles';

/**
 * Product card component for list of market products.
 * @extends React.Component
 */
class FavProductsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <FavProductsScreenHeader navigation={navigation} />
  })

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      isProcessing: false
    };

    this.getFavsReqParams = { favs: true, offset: null, limit: 20 };
    this.removeFavRequest = null;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Market');

      markRouteAsActive('Market');

      return true;
    });
  }

  componentWillReceiveProps(props) {
    const mode = getStateParam(props.navigation, 'mode', 'default');

    if (mode === 'default') {
      this.setState({ selected: [] });
    } else if (mode === 'delete' && this.state.selected.length > 0) {
      this.removeFavStatus();
    }
  }

  componentWillUnmount() {
    if (this.removeFavRequest != null) {
      this.removeFavRequest.abort();
    }

    BackHandler.removeEventListener('hardwareBackPress');
  }

  onSelect = (id) => {
    const selected = this.state.selected.slice();

    let i = selected.length;

    for (i; i > -1; i--) {
      if (selected[i] === id) {
        selected.splice(i, 1);
        break;
      }

      if (i === 0) {
        selected.push(id);
        break;
      }
    }

    this.setState({ selected });
    this.props.navigation.setParams({ count: selected.length });
  };

  onFavToggle = () => {
    this.productCardsRef.refreshProducts();
  };

  removeFavStatus = async () => {
    this.setState({ isProcessing: true });
    this.removeFavRequest = productService.toggleFavStatus(...this.state.selected);

    try {
      await this.removeFavRequest.run();
      this.props.navigation.setParams({ mode: 'default', count: 0 });
      this.productCardsRef.refreshProducts();
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isProcessing: false });
    }
  };

  navToProductScreen = (product) => {
    this.props.navigation.navigate('Product', {
      id: product.id,
      onGoBack: this.productCardsRef.refreshProducts
    });
  }

  productCardsRef = null;

  bindProductCardsRef = (ref) => {
    this.productCardsRef = ref;
  };

  render() {
    const mode = getStateParam(this.props.navigation, 'mode', 'default');

    return (
      <View style={styles.container}>
        {this.state.isProcessing && <ActivityIndicator animate style={styles.activityIndicator} />}
        <ProductCards
          params={this.getFavsReqParams}
          ref={this.bindProductCardsRef}
          cardToggleType={mode !== 'default' ? ProductCard.selectionToggle : ProductCard.favToggle}
          selected={this.state.selected}
          onCardFavToggle={this.onFavToggle}
          onCardSelect={this.onSelect}
          onCardPress={this.navToProductScreen}
          isShowADS={false}
        />
      </View>
    );
  }
}

export default FavProductsScreen;
