/** @module src/auth/AuthNavigator */

import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { headerDefault } from '../common/styles';
import { platform } from '../common/helpers';
import LoginRegNavigator from './LoginRegNavigator';
import PasswordResetScreen from './PasswordResetScreen';
import SuccessRegScreen from './SuccessRegScreen';
import OAuthScreen from './OAuthScreen';

/**
 * Navigator component for Auth module.
 * @returns Component
 */
const AuthNavigator = StackNavigator({
  LoginReg: { screen: LoginRegNavigator },
  PasswordReset: { screen: PasswordResetScreen },
  SuccessReg: { screen: SuccessRegScreen },
  OAuth: { screen: OAuthScreen }
}, {
  initialRouteName: 'LoginReg',
  navigationOptions: {
    headerStyle: {
      ...StyleSheet.flatten(headerDefault.headerStyle),
      ...((platform.ios || platform.android) && { elevation: 0 } : {})
    },
    headerTintColor: headerDefault.headerTintColor
  }
});

export default AuthNavigator;
