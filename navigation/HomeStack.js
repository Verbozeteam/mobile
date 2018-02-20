/* @flow */

import { StackNavigator } from 'react-navigation';

import HomeView from '../views/HomeView';
import RoomsView from '../views/RoomsView';

import { Colors } from '../constants/styles';

const structure = {
  Home: {
    screen: HomeView,
    navigationOptions: {
      header: null,
      title: 'Home'
    }
  },
  Rooms: {
    screen: RoomsView,
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
  initialRouteName: 'Rooms',
};

export default StackNavigator(structure, options);
