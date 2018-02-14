/* @flow */

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainNavigator from './navigation/MainNavigator';
import FirstConfigureStack from './navigation/FirstConfigureStack';

type PropsType = {};
type StateType = {};

export default class VerbozeMobile extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  componentWillMount() {
    /* set status bar color to light */
    StatusBar.setBarStyle('light-content', true);
  }

  render() {
    const configure_done: boolean = false;

    if (configure_done) {
      return <MainNavigator />
    } else {
      return <FirstConfigureStack />
    }
  }
}
