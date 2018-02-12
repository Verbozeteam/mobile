/* @flow */

import { StackNavigator } from 'react-navigation';

import HomeView from '../views/HomeView';
import RoomsView from '../views/RoomsView';


const structure = {
  Home: {
    screen: HomeView,
    navigationOptions: {
      header: null,
      title: 'Home'
    }
  },
  Rooms: {
    screen: RoomsView
  }
};

const options = {
  initialRouteName: 'Home',
};

export default StackNavigator(structure, options);
