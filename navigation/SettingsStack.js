/* @flow */

import { Platform } from 'react-native';

import { StackNavigator } from 'react-navigation';

import { HeaderBlur } from './components/HeaderBlur';

import SettingsView from '../views/SettingsView';
import ConfigureView from '../views/ConfigureView';
import ChangeNameView from '../views/ChangeNameView';

import { Colors, TypeFaces } from '../constants/styles';


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
  initialRouteName: 'Settings',
  navigationOptions: {
    header: Platform.OS === 'ios' ? HeaderBlur : undefined,
    headerTintColor: Colors.white,
    headerBackTitleStyle: {
      color: Colors.red
    },
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? 'transparent' : Colors.dark_gray
    }
  }
};

export default StackNavigator(structure, options);
