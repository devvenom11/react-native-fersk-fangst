import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TextInput,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Appsee from 'react-native-appsee';

import { bindComponentRef, forceLayoutUpdate } from '../../common/helpers';
import { palette, headerTransparent, shadow } from '../../common/styles';
import DrawerOpener from '../../common/DrawerOpener';
import Touchable from '../../common/Touchable';
import SubcategoryCardList from '../subcategory/SubcategoryCardList';
import subcategoryStore from '../subcategory/subcategoryStore';
import CategoryBanner from './CategoryBanner';
import styles from './CategoryScreen.styles';
import ChatModal from '../../ChatModal';

/**
 * Market category screen component.
 * @extends React.Component
 */
class CategoryScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    headerLeft: <DrawerOpener navigate={screenProps.parentNavigation.navigate} />,
    ...headerTransparent
  });

  constructor(props) {
    super(props);

    const { category } = this.props.screenProps;

    this.state = {
      category,
      subcategories: subcategoryStore.filter(subcat => subcat.categoryId === category.id)
    };
  }

  componentDidMount() {
    Appsee.addEvent('Reached CategoryScreen');
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.category.route === 'Seafood') {
        BackHandler.exitApp();
      }

      return false;
    });

    // Hack to enable TextInput touch events inside ViewPagerAndroid.
    // https://github.com/facebook/react-native/issues/9958
    // https://github.com/react-navigation/react-navigation/issues/3521
    // https://github.com/react-navigation/react-navigation/issues/1992
    forceLayoutUpdate(this.refsCache.get('scroll'), { width: '99.9%' }, { width: '100%' });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  onSubcategorySelect = (id, title) => {
    this.props.navigation.navigate('Subcategory', {
      categoryId: this.state.category.id,
      subcategoryId: id,
      title
    });
  };

  navToSearchScreen = ({ nativeEvent }) => {
    this.props.screenProps.parentNavigation.navigate('ProductSearch', { searchTerm: nativeEvent.text });
    this.refsCache.get('search').clear();
  };

  navToMapScreen = () => {
    this.props.screenProps.parentNavigation.navigate('Map', { category: this.state.category.id });
  };

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" ref={bindComponentRef.call(this, 'scroll')}>
        <ChatModal />
        <CategoryBanner
          image={this.state.category.banner}
          title={this.state.category.title}
        />
        <View style={[styles.searchBox, shadow]}>
          <View style={styles.searchIcon}>
            <Icon name="search" size={24} />
          </View>
          <TextInput
            ref={bindComponentRef.call(this, 'search')}
            style={styles.searchField}
            placeholder="Søk"
            placeholderTextColor={palette[3]}
            underlineColorAndroid="transparent"
            autoCapitalize="sentences"
            returnKeyType="search"
            onSubmitEditing={this.navToSearchScreen}
          />
          <Touchable onPress={this.navToMapScreen}>
            <View style={styles.mapLauncher}>
              <Icon name="map" size={24} color={palette[0]} />
            </View>
          </Touchable>
        </View>
        <SubcategoryCardList
          subcategories={this.state.subcategories}
          onSubcategorySelect={this.onSubcategorySelect}
        />
      </ScrollView>
    );
  }
}

export default CategoryScreen;
