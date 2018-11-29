import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import authService from './auth/authService';
import appRoutes from './appRoutes';
import DrawerHeader from './DrawerHeader';
import DrawerFooter from './DrawerFooter';
import DrawerRoute from './DrawerRoute';
import styles from './Drawer.styles';

// const DrawerHeader = require('./DrawerHeader').default;

/**
 * Custom component for DrawerNavigator.
 * @extends Component
 */
class Drawer extends Component {
  constructor(props) {
    super(props);

    this.routesToShow = /Market|Favorites|Settings|Messenger/;
    this.routesRequiringAuth = /NewProduct|Favorites|Settings|Messenger/;

    this.state = {
      routes: Object.keys(appRoutes).filter(route => this.routesToShow.test(route)),
      activeRoute: 'Market',
      userIsLogged: false,
      user: null
    };
  }

  componentDidMount() {
    authService.onUserChange.add(this.setUser);
  }

  componentWillUnmount() {
    authService.onUserChange.delete(this.setUser);
  }

  onRouteSelect = (route, params) => {
    const routeAction = this.routeAction(route, params);
    const action = !this.state.userIsLogged && this.routesRequiringAuth.test(route) ?
      NavigationActions.navigate({ routeName: 'Auth', params: { redirectTo: routeAction } }) :
      routeAction;

    this.props.navigation.dispatch(action);

    this.setActiveRoute(route);
  };

  setUser = (userIsLogged, user) => {
    this.setState({ userIsLogged, user });
  };

  setActiveRoute = (route) => {
    this.setState({ activeRoute: route });
  };

  routeIcons = {
    Market: 'shopping-cart',
    Favorites: 'star',
    Settings: 'settings',
    Messenger: 'message'
  };

  routeLabels = {
    Market: 'Markedet',
    Favorites: 'Favoritter',
    Settings: 'Innstillinger',
    Messenger: 'Meldinger'
  };

  routeAction = (routeName, params) => {
    let action = NavigationActions.navigate({ routeName, params });

    switch (routeName) {
      case 'MyProfile':
        action = NavigationActions.navigate({
          routeName,
          params: { ...params, onLogout: this.onLogout }
        });
        break;
      case 'NewProduct':
        action = NavigationActions.navigate({
          routeName: 'ProductForm',
          params: { prevActiveRoute: this.state.activeRoute }
        });
        break;
      case 'Favorites':
        action = NavigationActions.navigate({
          routeName,
          action: NavigationActions.navigate({ routeName: 'FavProducts' })
        });
        break;
      case 'Messenger':
        action = NavigationActions.navigate({
          routeName,
          params: { loadDialogs: true }
        });
        break;
      default:
        break;
    }

    return action;
  };

  renderRoute = route => (
    <DrawerRoute
      key={route}
      routeName={route}
      label={this.routeLabels[route]}
      iconName={this.routeIcons[route]}
      active={this.state.activeRoute === route}
      onRouteSelect={this.onRouteSelect}
    />
  );

  render() {
    const { routes, userIsLogged, user, activeRoute } = this.state;

    return (
      <View style={styles.container}>
        <DrawerHeader
          onRouteSelect={this.onRouteSelect}
          userIsLogged={userIsLogged}
          user={user}
        />
        <ScrollView contentContainerStyle={styles.routes}>
          {userIsLogged && (
            <DrawerRoute
              routeName="NewProduct"
              label="Ny Annonse"
              iconName="add-circle"
              active={activeRoute === 'NewProduct'}
              onRouteSelect={this.onRouteSelect}
            />
          )}
          {routes.map(this.renderRoute)}
          <View style={styles.footer}>
            <DrawerFooter userIsLogged={userIsLogged} navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Drawer;
