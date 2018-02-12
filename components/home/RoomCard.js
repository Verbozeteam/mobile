/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

type PropsType = {
  name: string,
  totalLights: number,
  lightsOn: number,
  temperature: number
};
type StateType = {};

export default class RoomCard extends Component<PropsType, StateType> {
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.cardIcon }>
          <View style={{ width: 75, height: 45, backgroundColor: 'white'}}/>
        </View>
        <Text style={ styles.cardName }>
          { this.props.name }
        </Text>
        <View style={ styles.statsIcons }>
          <View style={ styles.statIcon }>
            <View style={{ width: 30, height: 30, backgroundColor: 'white' }} />
          </View>
          <View style={ styles.statIcon }>
            <View style={{ width: 30, height: 30, backgroundColor: 'white' }} />
          </View>
        </View>
        <View style={ styles.cardStats }>
          <Text style={ styles.statsText }>{ this.props.lightsOn } / { this.props.totalLights } ON</Text>
          <Text style={ styles.statsText }>{ this.props.temperature }°C</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 210,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  cardIcon: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardName: {
    flex: 2,
    color: 'white',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardStats: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  statsText: {
    color: 'white',
    flex: 1,
    textAlign: 'center'
  },
  statsIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
