/* @flow */

import { StackNavigator } from 'react-navigation';

import WelcomeView from '../views/WelcomeView';
import ConfigureView from '../views/ConfigureView';

import { Colors, TypeFaces } from '../constants/styles';


const structure = {
  Welcome: {
    screen: WelcomeView,
    navigationOptions: {
      header: null
    }
  },
  Configure: {
    screen: ConfigureView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        borderBottomWidth: 0,
        top: 0,
        right: 0,
        left: 0,
        elevation: 0
      },
      headerTintColor: Colors.red
    }
  }
};

const options = {
  initialRouteName: 'Welcome'
};

export default StackNavigator(structure, options);
