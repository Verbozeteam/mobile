/* @flow */

import { StackNavigator } from 'react-navigation';

import WelcomeView from '../views/WelcomeView';
import ConfigureView from '../views/ConfigureView';

const structure = {
  Welcome: {
    screen: WelcomeView,
    navigationOptions: {
      header: null
    }
  },
  Configure: {
    screen: ConfigureView
  }
};

const options = {
  initialRouteName: 'Welcome'
};

export default StackNavigator(structure, options);
