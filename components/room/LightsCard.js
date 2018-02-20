/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Heading from '../Heading';
import LightSwitch from './LightSwitch';
import LightDimmer from './LightDimmer';

import { Colors } from '../../constants/styles';

type PropsType = {};
type StateType = {};

export default class LightsCard extends Component<PropsType, StateType> {
  render() {
    return (
      <View style={ styles.card } >
        <Heading text='Lights' />
        <LightSwitch id={ 'lightswitch-1' }/>
        <LightSwitch id={ 'lightswitch-2' }/>
        <LightSwitch id={ 'lightswitch-3' }/>

        <LightDimmer id={ 'dimmer-1' }/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 424,
    backgroundColor: 'grey'
  }
});
