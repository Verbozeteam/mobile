/* @flow */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { TabBarBottomBlur } from './components/TabBarBottomBlur';

import NotificationsView from '../views/NotificationsView';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';
import RoomsView from '../views/RoomsView';

import { Colors, TypeFaces } from '../constants/styles';

/* iOS tabbar icons */
const notifications_tabbar_icon = require('../assets/navigation/notifications.png');
const notifications_tabbar_icon_selected = require('../assets/navigation/notifications_selected.png');
const home_tabbar_icon = require('../assets/navigation/home.png');
const home_tabbar_icon_selected = require('../assets/navigation/home_selected.png');
const settings_tabbar_icon = require('../assets/navigation/settings.png');
const settings_tabbar_icon_selected = require('../assets/navigation/settings_selected.png');


const structure = {
  // Notifications: {
  //   screen: NotificationsView,
  //   navigationOptions: {
  //     tabBarIcon: (state: {focused: boolean}) => (
  //       <Image style={styles.tabbar_icon}
  //         source={(state.focused) ? notifications_tabbar_icon_selected :
  //           notifications_tabbar_icon} />
  //     ),
  //     tabBarLabel: 'Notifications',
  //   }
  // },
  Home: {
    screen: RoomsView,
    navigationOptions: {
      tabBarIcon: (state: {focused: boolean}) => (
        <Image style={styles.tabbar_icon}
          source={(state.focused) ? home_tabbar_icon_selected :
            home_tabbar_icon} />
      ),
      tabBarLabel: 'Home',
      // header: null,
      title: 'Home'
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarIcon: (state: {focused: boolean}) => (
        <Image style={styles.tabbar_icon}
          source={(state.focused) ? settings_tabbar_icon_selected :
            settings_tabbar_icon} />
      ),
      tabBarLabel: 'Settings',
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

const options = {
  lazy: true,
  initialRouteName: 'Home',
  tabBarComponent: TabBarBottomBlur,
  tabBarOptions: {
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.gray,
    labelStyle: TypeFaces.ios_tabbar_label,
    style: {
      backgroundColor: 'transparent'
    }
  }
};

export default TabNavigator(structure, options);
