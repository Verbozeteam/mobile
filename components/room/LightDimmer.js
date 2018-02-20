/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

import MagicSlider from '../../react-components/MagicSlider';

type PropsType = {
  id: string,
};

type StateType = {};

export default class LightDimmer extends Component<PropsType, StateType> {
  render() {
    return (
      <MagicSlider />
    );
  };
}