/* @flow */

import React, { Component } from 'react';
import Navigation from './navigation/Navigation';

type PropsType = {};
type StateType = {};

export default class VerbozeMobile extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    return (
      <Navigation />
    );
  }
}
