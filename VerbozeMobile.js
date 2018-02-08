/* @flow */

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigation/Navigation';

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
    return (
      <Navigation />
    );
  }
}
