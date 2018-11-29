/**
 * Navigator component for Market module.
 */

import { StackNavigator } from 'react-navigation';

import ImageViewerScreen from '../common/ImageViewerScreen';
import ChatScreen from '../chat/ChatScreen';
import ShowOnMapScreen from '../map/ShowOnMapScreen';
import LocationPickerScreen from '../map/LocationPickerScreen';
import ProfileScreen from '../profile/ProfileScreen';
import CategoriesNavigator from './category/CategoriesNavigator';
import ProductScreen from './product/ProductScreen';
import FavProductsScreen from './product/FavProductsScreen';
import ProductFormScreen from './product/ProductFormScreen';
import ProductSearchScreen from './product/ProductSearchScreen';
import MapScreen from './map/MapScreen';

const MarketNavigator = StackNavigator({
  Categories: { screen: CategoriesNavigator },
  Product: { screen: ProductScreen },
  ProfileDetail: { screen: ProfileScreen },
  FavProducts: { screen: FavProductsScreen },
  ProductForm: { screen: ProductFormScreen },
  ProductSearch: { screen: ProductSearchScreen },
  Map: { screen: MapScreen },
  LocationPicker: { screen: LocationPickerScreen },
  ShowOnMap: { screen: ShowOnMapScreen },
  Chat: { screen: ChatScreen },
  ImageViewer: { screen: ImageViewerScreen }
}, {
    initialRouteName: 'Categories'
  });

export default MarketNavigator;
