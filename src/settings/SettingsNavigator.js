/** @module src/settings/SettingsNavigator */

import { StackNavigator } from 'react-navigation';

import LocationPickerScreen from '../map/LocationPickerScreen';
import ProfileSettingsScreen from '../profile/ProfileSettingsScreen';
import ProfileDeleteScreen from '../profile/ProfileDeleteScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import ChangeEmailScreen from './ChangeEmailScreen';
import SettingsScreen from './SettingsScreen';

/**
 * Navigator component for Settings module.
 * @type {StackNavigator}
 */
const SettingsNavigator = StackNavigator({
  Settings: { screen: SettingsScreen },
  ProfileSettings: { screen: ProfileSettingsScreen },
  ChangePassword: { screen: ChangePasswordScreen },
  ChangeEmail: { screen: ChangeEmailScreen },
  ProfileDelete: { screen: ProfileDeleteScreen },
  LocationPicker: { screen: LocationPickerScreen }
}, {
  initialRouteName: 'Settings'
});

export default SettingsNavigator;
