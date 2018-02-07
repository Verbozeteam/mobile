/* @flow */

import React, { Component } from 'react';

import HomeView from './views/HomeView';

type PropsType = {};
type StateType = {};

export default class VerbozeMobile extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    return (
      <HomeView />
    );
  }
}
