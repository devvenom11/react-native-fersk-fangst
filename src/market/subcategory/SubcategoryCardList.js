import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { calcGrid } from '../../common/helpers';
import SubcategoryCard from './SubcategoryCard';
import styles from './SubcategoryCardList.styles';

/**
 * Component for subcategories list inside category screen.
 * @extends React.Component
 */
class SubcategoryCardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenWidth: 0,
      colMinWidth: 160,
      colWidth: 160,
      isLoading: true
    };
  }

  onLayoutChange = (evt) => {
    const { width } = evt.nativeEvent.layout;

    if (width !== this.state.screenWidth) {
      this.setState({
        screenWidth: width,
        colWidth: (width - 10)/2,
        isLoading: false
      });
    }
  };

  renderSubcategoryCard = subcategory => (
    <View
      style={{ width: this.state.colWidth }}
      key={subcategory.id}
    >
      <SubcategoryCard
        subcategory={subcategory}
        onSelect={this.props.onSubcategorySelect}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator animate size="large" />
          </View>
        )}
        <View style={styles.subcategories} onLayout={this.onLayoutChange}>
          {this.props.subcategories.map(this.renderSubcategoryCard)}
        </View>
      </View>
    );
  }
}

SubcategoryCardList.defaultProps = {
  subcategories: [],
  onSubcategorySelect() {}
};

export default SubcategoryCardList;
