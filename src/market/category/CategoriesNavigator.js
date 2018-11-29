import React from 'react';
import { Text, Image, StyleSheet, View, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import CategoryNavigator from './CategoryNavigator';
import categoryStore from './categoryStore';
import { palette } from '../../common/styles';

const styles = StyleSheet.create({
  tabBarLabel: {
    color: palette[0],
    display: 'none',
    fontWeight: 'normal',
    textAlign: 'center',
    paddingTop: 5
  },
  tabBarLabelFocused: {
    display: 'flex',
    width: 80
  },
  tabbarView: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  }

});

/**
 * Tab navigator component for Market module categories.
 * @returns React.Component
 */
const CategoriesNavigator = TabNavigator({
  Seafood: { screen: CategoryNavigator },
  Nature: { screen: CategoryNavigator },
  Farm: { screen: CategoryNavigator },
  Services: { screen: CategoryNavigator },
  // EasterEggs: { screen: CategoryNavigator }
}, {
    initialRouteName: 'Seafood',
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
      upperCaseLabel: false,
      showIcon: true,
      indicatorStyle: { display: 'none' },
      style: { backgroundColor: palette[2], height: 70 }
    },
    navigationOptions: ({ navigation }) => {
      const category = categoryStore.find(cat => cat.route === navigation.state.routeName);

      return Platform.OS == "ios" ? { 
        header: null,
        tabBarLabel: ({ focused }) => (
          <View style={styles.tabbarView}>
            <Image source={category.icon} />
            <Text
              style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}
            >
              {category.id === 3 ? 'Gårds\nprodukter' : category.title}
            </Text>
          </View >
        ),
        // tabBarIcon: () => <Image source={category.icon} />
      } : 
      { 
        header: null,
        tabBarLabel: ({ focused }) => (
            <Text
              style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}
            >
              {category.id === 3 ? 'Gårds\nprodukter' : category.title}
            </Text>
        ),
        tabBarIcon: () => <Image source={category.icon} />
      }
    }
  });

export default CategoriesNavigator;
