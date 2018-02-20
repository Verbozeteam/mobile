/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType } from '../../js-api-utils/ConfigManager';
import { TypeFaces } from '../../constants/styles';

import ThermostatCard from './ThermostatCard';
import CurtainsCard from './CurtainsCard';

type PropsType = {
  room_id: string
};

type StateType = {};

export default class RoomControls extends Component<PropsType, StateType> {

  _screen_width = Dimensions.get('screen').width;
  _screen_height = Dimensions.get('screen').height

  render() {
    const { room_id } = this.props;
    const room: RoomType | {} = ConfigManager.getRoom(room_id);

    return (
      <ScrollView contentContainerStyle={styles.control_container}
        style={[styles.container, {width: this._screen_width}]}>
        <ThermostatCard />
        <CurtainsCard />
        <View style={{height: this._screen_height / 3}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  control_container: {
    paddingVertical: 10
  }
});
