/** @module src/AppNavigator */

import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator as RNDrawerNavigator } from 'react-navigation';

import Drawer from './Drawer';
import appRoutes from './appRoutes';
import navigationDispatcher from './navigationDispatcher';

let drawerRef = Drawer;

function bindDrawerRef(ref) {
  drawerRef = ref;
}

const DrawerNavigator = RNDrawerNavigator({
  App: {
    screen: StackNavigator(
      appRoutes,
      {
        initialRouteName: 'Market',
        headerMode: 'none'
      })
  }
}, {
  initialRouteName: 'App',
  backBehavior: 'none',
  contentComponent: props => <Drawer ref={bindDrawerRef} {...props} />
});

export function markRouteAsActive(route) {
  drawerRef.setActiveRoute(route);
}

const { getStateForAction } = DrawerNavigator.router;

DrawerNavigator.router.getStateForAction = (action, state) => {
  if (action.type === 'Navigation/NAVIGATE') {
    switch (action.routeName) {
      case 'ProductForm':
        action.params = { ...action.params, prevActiveRoute: drawerRef.state.activeRoute };
        break;
      default:
        break;
    }
  }

  return getStateForAction(action, state);
};

class AppNavigator extends Component {
  bindRef = (ref) => {
    navigationDispatcher.setNavigator(ref);
  };

  render() {
    return <DrawerNavigator ref={this.bindRef} />;
  }
}

export default AppNavigator;
