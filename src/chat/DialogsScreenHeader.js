/** @module src/market/product/DialogsScreenHeader */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { palette, header } from '../common/styles';
import { getStateParam, platform } from '../common/helpers';
import DrawerOpener from '../common/DrawerOpener';
import HeaderButton from '../common/HeaderButton';
import modes from './dialogsScreenModes';

/*
 * Header for DialogsScreen.
 * @extends Component
 */
class ProductScreenHeader extends Component {
  startSelection = () => {
    this.props.navigation.setParams({ mode: modes.select });
  };

  cancelSelection = () => {
    this.props.navigation.setParams({ mode: modes.default, selected: 0 });
  };

  deleteSelection = () => {
    this.props.navigation.setParams({ mode: modes.delete });
  };

  render() {
    const { navigation } = this.props;
    const mode = getStateParam(navigation, 'mode', modes.default);
    const selected = getStateParam(navigation, 'selected', 0);

    return (
      <View style={header.default}>
        <View style={header.sectionLeft}>
          {mode === modes.default ? (
            <DrawerOpener navigate={navigation.navigate} />
          ) : (
              <HeaderButton onPress={this.cancelSelection}>
                <Icon name="arrow-back" size={22} color={palette[0]} />
              </HeaderButton>
            )}
          <Text style={styles.title}>{mode === modes.default ? 'Meldinger' : selected}</Text>
        </View>
        <View style={header.sectionRight}>
          <HeaderButton onPress={mode === modes.default ? this.startSelection : this.deleteSelection}>
            <Icon name="delete" size={22} color={palette[0]} />
          </HeaderButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    color: palette[0],
    textAlign: 'center',
    alignSelf: 'center',
    marginRight: 45,
    fontSize: (platform.ios ? 17 : 20)
  }

});

export default ProductScreenHeader;
