/** @module src/market/product/ProductSearcScreenHeader */

import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette } from '../../common/styles';
import { getStateParam, timeout } from '../../common/helpers';
import HeaderButton from '../../common/HeaderButton';
import styles from './ProductSearchScreenHeader.styles';

/*
 * Header for ProductSearchScreen.
 * @extends React.PureComponent
 */
class ProductSearcScreenHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: getStateParam(props.navigation, 'searchTerm', '') };
  }

  onChange = (searchTerm) => {
    this.setState({ searchTerm }, this.debounceChange);
  };

  debounceChange = () => {
    timeout(this.search, 300);
  };

  search = () => {
    if (this.state.searchTerm.length > 0) {
      this.props.navigation.setParams(this.state);
    }
  };

  clear = () => {
    this.setState({ searchTerm: '' });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderButton onPress={this.goBack}>
          <Icon name="arrow-back" size={20} color={palette[0]} />
        </HeaderButton>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.search}
            value={this.state.searchTerm}
            onChangeText={this.onChange}
            onSubmitEditing={this.search}
            placeholder="Søk"
            placeholderTextColor={palette[4]}
            underlineColorAndroid={palette[0]}
            autoCapitalize="sentences"
            returnKeyType="search"
            autoFocus={getStateParam(this.props.navigation, 'searchTerm') == null}
            disableFullscreenUI
          />
        </View>
        <HeaderButton onPress={this.clear}>
          <Icon name="close" size={20} color={palette[0]} />
        </HeaderButton>
      </View>
    );
  }
}

export default ProductSearcScreenHeader;
