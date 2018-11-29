/** @module src/market/ProfileNavigator */

import { StackNavigator } from 'react-navigation';

import ImageViewerScreen from '../common/ImageViewerScreen';
import LocationPickerScreen from '../map/LocationPickerScreen';
import ShowOnMapScreen from '../map/ShowOnMapScreen';
import ProductScreen from '../market/product/ProductScreen';
import ProductSFormcreen from '../market/product/ProductFormScreen';
import ProfileScreen from './ProfileScreen';
import ProfileSettingsScreen from './ProfileSettingsScreen';

/**
 * Navigator component for Profile module.
 * @type {StackNavigator}
 */
const ProfileNavigator = StackNavigator({
  ProfileDetail: { screen: ProfileScreen },
  ProfileSettings: { screen: ProfileSettingsScreen },
  Product: { screen: ProductScreen },
  ProductForm: { screen: ProductSFormcreen },
  LocationPicker: { screen: LocationPickerScreen },
  ShowOnMap: { screen: ShowOnMapScreen },
  ImageViewer: { screen: ImageViewerScreen }
}, {
    initialRouteName: 'ProfileDetail'
  });

export default ProfileNavigator;
