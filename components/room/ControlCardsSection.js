/* @flow */

import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

import LightsCard from './LightsCard';
import ThermostatCard from './ThermostatCard';
import CurtainsCard from './CurtainsCard';

type PropsType = {};
type StateType = {};

export default class ControlCardsSection extends Component<PropsType, StateType> {
  render() {
    return (
      <ScrollView>
        <LightsCard />
        <ThermostatCard />
        <CurtainsCard />
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({

});
