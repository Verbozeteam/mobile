/* @flow */

import React from 'react';

import HomeView from '../views/HomeView';

export const structure = {
  Home: {
    screen: HomeView,
    navigationOptions: {
      tabBarLabel: 'Home',
      drawerLabel: 'Home'
    }
  }
};

export const options = {
  lazy: true,
};
