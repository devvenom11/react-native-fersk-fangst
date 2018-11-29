/** @module src/market/group/GroupCard */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Touchable from '../../common/Touchable';
import styles from './GroupCard.styles';

/**
 * Group card component for a Market Group filter.
 * @extends React.PureComponent
 */
class GroupCard extends Component {
  onPress = () => {
    this.props.onPress(this.props.group.id);
  }

  render() {
    return (
      <Touchable onPress={this.onPress}>
        <View style={styles.card}>
          <Text style={this.props.selected ? styles.titleSelected : styles.title}>
            {this.props.group.title}
          </Text>
        </View>
      </Touchable>
    );
  }
}

GroupCard.defaultProps = {
  onPress() { },
  group: {
    id: 0,
    title: ''
  },
  selected: false
};

export default GroupCard;
