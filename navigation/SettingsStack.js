/* @flow */

import { StackNavigator } from 'react-navigation';

import SettingsView from '../views/SettingsView';
import ConfigureView from '../views/ConfigureView';
import ChangeNameView from '../views/ChangeNameView';


const structure = {
  Settings: {
    screen: SettingsView,
    navigationOptions: {
      title: 'Settings'
    }
  },
  Configure: {
    screen: ConfigureView,
    navigationOptions: {
      title: 'Configure'
    }
  },
  ChangeName: {
    screen: ChangeNameView,
    navigationOptions: {
      title: 'Change name'
    }
  }
};

const options = {
  initialRouteName: 'Settings'
};

export default StackNavigator(structure, options);
