import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Appsee from 'react-native-appsee';

import { markRouteAsActive } from '../../AppNavigator';
import { palette, headerDefault } from '../../common/styles';
import { getStateParam } from '../../common/helpers';
import HeaderButton from '../../common/HeaderButton';
import ActionButton from '../../common/ActionButton';
import authService from '../../auth/authService';
import GroupCards from '../group/GroupCards';
import ProductCards from '../product/ProductCards';
import ProductCard from '../product/ProductCard';
import styles from './SubcategoryScreen.styles';

/**
 * Screen component for a market subcategory.
 * @extends React.Component
 */
class SubcategoryScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: getStateParam(navigation, 'title', 'Markedet'),
    ...headerDefault,
    headerRight: (
      <HeaderButton onPress={() => { screenProps.parentNavigation.navigate('ProductSearch'); }}>
        <Icon name="search" size={20} color={palette[0]} />
      </HeaderButton>
    )
  });

  constructor(props) {
    super(props);
    Appsee.addEvent('Reached SubcategoryScreen');
    this.state = {
      params: {
        subcategory: getStateParam(props.navigation, 'subcategoryId', 1),
        group: null,
        offset: null,
        limit: 20
      },
      categoryId: getStateParam(props.navigation, 'categoryId', 1)
    };
  }

  onGroupSelect = (groupId) => {
    this.setState({
      params: { ...this.state.params, group: groupId === 0 ? null : groupId }
    });
  };

  navToProductScreen = (product) => {
    this.props.screenProps.parentNavigation.navigate('Product', {
      id: product.id,
      title: product.title,
      onGoBack: this.productCardsRef.refreshProducts
    });
  };

  navToProductForm = () => {
    const { categoryId, params } = this.state;
    const navAction = NavigationActions.navigate({
      routeName: 'ProductForm',
      params: {
        categoryId,
        subcategoryId: params.subcategory,
        groupId: params.group,
        onGoBack: this.productCardsRef.refreshProducts
      }
    });


    this.props.screenProps.parentNavigation.dispatch(
      authService.isLogged() ? navAction : NavigationActions.navigate({
        routeName: 'Auth',
        params: { redirectTo: navAction }
      })
    );

    markRouteAsActive('NewProduct');
  };

  productCardsRef = null;

  bindProductCardsRef = (ref) => {
    this.productCardsRef = ref;
  }

  render() {
    const { state } = this;

    return (
      <View style={styles.container}>
        <View style={styles.groups}>
          <GroupCards subcategoryId={state.params.subcategory} onGroupSelect={this.onGroupSelect} />
        </View>
        <ProductCards
          params={this.state.params}
          cardToggleType={authService.isLogged() ? ProductCard.favToggle : ''}
          onCardPress={this.navToProductScreen}
          ref={this.bindProductCardsRef}
        />
        <ActionButton onPress={this.navToProductForm}>
          <Icon name="add" size={25} color={palette[0]} />
        </ActionButton>
      </View>
    );
  }
}

export default SubcategoryScreen;
