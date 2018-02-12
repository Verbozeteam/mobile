/* @flow */

import { DrawerNavigator } from 'react-navigation';

import NotificationsView from '../views/NotificationsView';
import HomeStack from './HomeStack';
import SettingsStack from './SettingsStack';


const structure = {
  Notifications: {
    screen: NotificationsView,
    navigationOptions: {
      drawerLabel: 'Notifications',
    }
  },
  Home: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Home',
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      drawerLabel: 'Settings',
    }
  }
};

const options = {
  lazy: true,
  initialRouteName: 'Home'
};

export default DrawerNavigator(structure, options);
