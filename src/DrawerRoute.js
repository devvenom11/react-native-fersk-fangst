import React, { Component } from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';

import styles from './DrawerRoute.styles';
import Touchable from './common/Touchable';
import { palette } from './common/styles';

const Icon = Platform.select({
  android: () => require('react-native-vector-icons/MaterialIcons').default,
  ios: () => require('react-native-vector-icons/MaterialIcons').default
})();

/**
 * Component for route link for Drawer.
 * @extends Component
 */
class DrawerRoute extends Component {
  onRouteSelect = route => () => {
    this.props.onRouteSelect(route);
  }

  render() {
    const { props } = this;
    const hasIcon = props.iconName.length > 0;

    return (
      <Touchable
        key={props.routeKey}
        onPress={this.onRouteSelect(props.routeName)}
      >
        <View style={[styles.route, !hasIcon && styles.routeWithoutIcon]}>
          {hasIcon && (
            <Icon
              name={props.iconName}
              size={20}
              color={props.active ? palette[2] : `${palette[3]}40`}
            />
          )}
          <Text style={[styles.routeLabel, props.active && styles.routeLabelActive]}>
            {props.label.length > 0 ? props.label : props.routeName}
          </Text>
        </View>
      </Touchable>
    );
  }
}

DrawerRoute.defaultProps = {
  iconName: '',
  routeName: '',
  label: '',
  active: false,
  onRouteSelect() {}
};

export default DrawerRoute;
