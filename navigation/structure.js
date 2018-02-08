/* @flow */

import React from 'react';
import { Image, StyleSheet } from 'react-native';

import NotificationsView from '../views/NotificationsView';
import HomeView from '../views/HomeView';
import SettingsView from '../views/SettingsView';

import { TabBarBottomBlur } from './TabBarBottomBlur';

/* tab bar icon images */
const notifications_tabbar_icon = require('../assets/navigation/notifications.png');
const notifications_tabbar_icon_selected = require('../assets/navigation/notifications_selected.png');
const home_tabbar_icon = require('../assets/navigation/home.png');
const home_tabbar_icon_selected = require('../assets/navigation/home_selected.png');
const settings_tabbar_icon = require('../assets/navigation/settings.png');
const settings_tabbar_icon_selected = require('../assets/navigation/settings_selected.png');

export const structure = {
  Notifications: {
    screen: NotificationsView,
    navigationOptions: {
      tabBarIcon: (state: {focused: boolean}) => (
        <Image style={styles.tabbar_icon}
          source={(state.focused) ? notifications_tabbar_icon_selected :
            notifications_tabbar_icon} />
      ),
      tabBarLabel: 'Notifications',
      drawerLabel: 'Notifications'
    }
  },
  Home: {
    screen: HomeView,
    navigationOptions: {
      tabBarIcon: (state: {focused: boolean}) => (
        <Image style={styles.tabbar_icon}
          source={(state.focused) ? home_tabbar_icon_selected :
            home_tabbar_icon} />
      ),
      tabBarLabel: 'Home',
      drawerLabel: 'Home',
    }
  },
  Settings: {
    screen: SettingsView,
    navigationOptions: {
      tabBarIcon: (state: {focused: boolean}) => (
        <Image style={styles.tabbar_icon}
          source={(state.focused) ? settings_tabbar_icon_selected :
            settings_tabbar_icon} />
      ),
      tabBarLabel: 'Settings',
      drawerLabel: 'Settings'
    }
  }
};

const styles = StyleSheet.create({
  tabbar_icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  }
});

export const options = {
  lazy: true,
  initialRouteName: 'Home',
  tabBarComponent: TabBarBottomBlur,
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    inactiveTintColor: '#707070',
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    style: {
      backgroundColor: 'transparent'
    }
  }
};
