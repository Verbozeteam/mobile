/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType } from '../../js-api-utils/ConfigManager';
import { TypeFaces } from '../../constants/styles';

import ControlCardsSection from './ControlCardsSection';

type PropsType = {
  room_id: string
};

type StateType = {};

export default class RoomControls extends Component<PropsType, StateType> {

  _screen_width = Dimensions.get('screen').width;

  render() {
    const { room_id } = this.props;
    const room: RoomType | {} = ConfigManager.getRoom(room_id);

    return (
      <View style={[styles.container, {width: this._screen_width}]}>
        <ControlCardsSection />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
