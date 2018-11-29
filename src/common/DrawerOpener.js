import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderButton from './HeaderButton';
import { palette } from './styles';

/**
 * Button for app header to open DrawerNavigator
 * @extends Component
 */
class DrawerOpener extends Component {
  onPress = () => {
    this.props.navigate('DrawerOpen');
  }

  render() {
    return (
      <HeaderButton onPress={this.onPress}>
        <Icon
          name="menu"
          size={22}
          color={palette[0]}
        />
      </HeaderButton>
    );
  }
}

DrawerOpener.defaultProps = {
  navigate() { }
};

export default DrawerOpener;
