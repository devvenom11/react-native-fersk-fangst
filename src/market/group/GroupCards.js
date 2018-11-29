import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import groupStore from './groupStore';
import GroupCard from './GroupCard';

/**
 * Card component for a product group list.
 * Used as filter inside subcategory screen.
 * @extends React.PureComponent
 */
class GroupCards extends Component {
  constructor(props) {
    super(props);

    const { subcategoryId } = this.props;
    const groups = groupStore.filterBySubcategory(subcategoryId);

    if (groups.length > 0) {
      groups.unshift({ id: 0, title: 'Alle' });
    }

    this.state = { selectedGroup: 0, groups };
  }

  onGroupSelect = (id) => {
    this.setState({ selectedGroup: id });
    this.props.onGroupSelect(id);
  }

  renderGroup = group => (
    <GroupCard
      key={group.id}
      group={group}
      selected={group.id === this.state.selectedGroup}
      onPress={this.onGroupSelect}
    />
  )

  render() {
    return this.state.groups.length > 0 ? (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.state.groups.map(this.renderGroup)}
        </ScrollView>
      </View>
    ) : null;
  }
}

GroupCards.defaultProps = {
  onGroupSelect() {},
  subcategoryId: 1
};


export default GroupCards;
