import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Touchable from '../../common/Touchable';
import { palette, shadow } from '../../common/styles';

const styles = StyleSheet.create({
  subcategoryCardContainer: {
    alignItems: 'center',
    backgroundColor: palette[0],
    borderRadius: 2,
    elevation: 3,
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    height: 100
  },
  subcategoryTitle: {
    color: palette[3],
    fontSize: 16
  }
});

/**
 * Subcategory card for subcategories list component.
 * @extends React.PureComponent
 */
class SubcategoryCard extends Component {
  onPress = () => {
    const { subcategory } = this.props;

    this.props.onSelect(subcategory.id, subcategory.title);
  }

  render() {
    const { subcategory } = this.props;

    return (
      <Touchable onPress={this.onPress}>
        <View style={[styles.subcategoryCardContainer, shadow]}>
          <Image source={subcategory.icon} />
          <Text style={styles.subcategoryTitle}>{subcategory.title}</Text>
        </View>
      </Touchable>
    );
  }
}

SubcategoryCard.defaultProps = {
  subcategory: {
    title: '',
    icon: null,
    id: 0
  },
  onSelect() { }
};

export default SubcategoryCard;
