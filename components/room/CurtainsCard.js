/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

import ControlCard from './ControlCard';
import CardRow from './CardRow';
import Divider from './Divider';
import CurtainControl from './CurtainControl';

type PropsType = {};
type StateType = {};

export default class CurtainsCard extends Component<PropsType, StateType> {

  _background: number = require('../../assets/images/curtains_background.png');

  render() {
    const curtains = [];
    for (var i = 0; i < 2; i++) {
      curtains.push(
        <CardRow key={'curtain-control-' + i}>
          <CurtainControl name={'Shade'}/>
        </CardRow>
      );
    }

    return (
      <ControlCard title={'Curtains'}
        background={this._background}>

        <CardRow>
          <CurtainControl name={'All'} />
        </CardRow>
        <Divider />
        {curtains}

      </ControlCard>
    );
  };
}

const styles = StyleSheet.create({

});
