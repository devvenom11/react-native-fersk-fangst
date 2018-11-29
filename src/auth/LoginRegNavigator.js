/** @module src/auth/LoginRegNavigator */

import React from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';

import { palette } from '../common/styles';
import { platform } from '../common/helpers';
import DrawerOpener from '../common/DrawerOpener';
import LoginRegScreen from './LoginRegScreen';

/**
 * Navigator component for Login and Registration screens.
 * @returns Component
 */
const LoginRegNavigator = TabNavigator({
  Login: { screen: LoginRegScreen },
  Registration: { screen: LoginRegScreen }
}, {
    tabBarComponent: TabBarTop,
    initialRouteName: 'Login',
    tabBarOptions: {
      indicatorStyle: {
        borderBottomWidth: 3,
        borderBottomColor: palette[2]
      },
      labelStyle: {
        fontWeight: 'bold',
        fontSize: 16
      },
      style: {
        backgroundColor: palette[3]
      },
      activeTintColor: palette[2]
    },
    tabBarPosition: 'top',
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerOpener navigate={navigation.navigate} />,
      tabBarLabel: (navigation.state.routeName === 'Login' ? 'LOGG INN' : 'REGISTRERING')
    })
  });

export default LoginRegNavigator;
