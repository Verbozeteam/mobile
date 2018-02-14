/* @flow */

import React, { Component } from 'react';

import { StatusBar, Platform } from 'react-native';

import { StackNavigator } from 'react-navigation';

import MainNavigator from './navigation/MainNavigator';
import FirstConfigureStack from './navigation/FirstConfigureStack';

type PropsType = {};
type StateType = {};

export default class VerbozeMobile extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  componentWillMount() {

	/* set status bar color to light if iOS */
	Platform.OS === 'ios' ? StatusBar.setBarStyle('light-content', true) : StatusBar.setBackgroundColor('#1E1E1E');
  }

  render() {
    const configure_done: boolean = true;

    if (configure_done) {
      return <MainNavigator />
    } else {
      return <FirstConfigureStack />
    }
  }
}
