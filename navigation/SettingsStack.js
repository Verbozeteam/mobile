/* @flow */

import { StackNavigator } from 'react-navigation';

import SettingsView from '../views/SettingsView';
import ConfigureView from '../views/ConfigureView';


const structure = {
  Settings: {
    screen: SettingsView,
    navigationOptions: {
      header: null,
      title: 'Settings'
    }
  },
  Configure: {
    screen: ConfigureView,
  }
};

const options = {
  initialRouteName: 'Settings'
};

export default StackNavigator(structure, options);
