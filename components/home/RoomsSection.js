/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ConfigType } from '../../js-api-utils/ConfigManager';

import Heading from '../Heading';
import RoomCard from './RoomCard';

type PropsType = {};
type StateType = {};

export default class RoomsSection extends Component<PropsType, StateType> {

  _unsubscribe = ConfigManager.registerConfigChangeCallback(
    this.onConfigChange.bind(this));

  _living_room_banner = require('../../assets/home/home-living-room.jpg');

  onConfigChange(config: ConfigType) {
    /* if config changes, force a rerender */
    this.forceUpdate();
  }

  renderRoomCards() {
    try {
      const rooms = ConfigManager.config.rooms;
      const room_cards = [];
      for (var i = 0; i < rooms.length; i++) {
        room_cards.push(
          <RoomCard key={'room-card-' + rooms[i].id}
            room={rooms[i]} />
        );
      }
      return room_cards;
    }

    catch (err) {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner_container}>
          <Image source={this._living_room_banner} style={styles.living_room_banner} />
        </View>
        <View style={styles.scroll_container}>
          <Heading text={'Rooms'} />
          <ScrollView horizontal={true}
            contentContainerStyle={styles.content_container}>
            {this.renderRoomCards()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 8
  },
  banner_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4
  },
  content_container: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10
  },
  living_room_banner: {
    resizeMode: 'contain',
    height: '100%',
  },
  scroll_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
});
