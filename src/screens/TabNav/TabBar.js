import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Dashboard/Home';
import Profile from '../Dashboard/Profile';
import Category from '../Dashboard/Categories';
import Card from '../Dashboard/Card';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: 'home' }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{ tabBarIcon: 'Category' }}
      />
      <Tab.Screen
        name="Card"
        component={Card}
        options={{ tabBarIcon: 'Card' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: 'person' }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
