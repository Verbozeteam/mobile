/* @flow */

import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import Navigation from './navigation/Navigation';

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
    return (
      <Navigation />
    );
  }
}
