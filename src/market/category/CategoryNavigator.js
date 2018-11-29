import React from 'react';
import { StackNavigator } from 'react-navigation';
import CategoryScreen from './CategoryScreen';
import SubcategoryScreen from '../subcategory/SubcategoryScreen';
import categoryStore from './categoryStore';

const CategoryStack = StackNavigator({
  Category: { screen: CategoryScreen },
  Subcategory: { screen: SubcategoryScreen }
}, {
  initialRouteName: 'Category'
});

/**
 * Component for navigation inside Market categories.
 * @returns React.Component
 */
function CategoryNavigator({ navigation }) {
  const screenProps = {
    parentNavigation: navigation,
    category: categoryStore.find(cat => cat.route === navigation.state.routeName)
  };

  return <CategoryStack screenProps={screenProps} />;
}

export default CategoryNavigator;
