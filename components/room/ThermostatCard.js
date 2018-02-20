/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PropsType = {};
type StateType = {};

export default class ThermostatCard extends Component<PropsType, StateType> {
  render() {
    return (
      <Text style={{ color: 'white' }}>
        THIS IS THE THERMOSTAT CARD!
      </Text>
    );
  }
}

const styles = StyleSheet.create({

});

