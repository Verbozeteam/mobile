/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';

import { ConfigManager, ConfigType } from '../../js-api-utils/ConfigManager';

import RoomCard from './RoomCard';
import Heading from '../Heading';

type RoomDetailsType = {
  id: string,
  name: string,
  totalLights: number,
  lightsOn: Array<string>,
  temperature: number
};

type PropsType = {};
type StateType = {
  rooms: Array<RoomDetailsType>
};

export default class RoomsSection extends Component<PropsType, StateType> {

  _living_room = require('../../assets/home/home-living-room.jpg');
  _unsubscribe_config_changes: () => null = () => null;
  _unsubscribe_lights_changes: () => null = () => null;
  _unsubscribe_thermostat_changes: () => null = () => null;

  /* Room Type Icons */
  _living_room_icon = require('../../assets/home/living_room.png');

  state = {
    rooms: []
  };

  componentWillMount() {
    /* register to changes in config, lights and thermostats */
    this._unsubscribe_config_changes =
      ConfigManager.registerConfigChangeCallback(
        this.parseRoomsFromConfig.bind(this));

    this._unsubscribe_lights_changes =
      ConfigManager.registerCategoryChangeCallback(
        'light_switches', this.lightsChanged.bind(this));

    this._unsubscribe_thermostat_changes =
      ConfigManager.registerCategoryChangeCallback(
        'central_acs', this.thermostatChanged.bind(this));

    /* parse rooms */
    this.parseRoomsFromConfig(ConfigManager.config);
  }

  parseRoomsFromConfig(config: ConfigType) {
    try {
      const rooms = [];
      for (var i = 0; i < config.rooms.length; i++) {
        const room = config.rooms[i];
        const parsed_room = {};

        /* copy over room name and ID, and initialize other parameters */
        parsed_room.id = room.id;
        parsed_room.name = room.name;
        parsed_room.totalLights = 0;
        parsed_room.lightsOn = [];
        parsed_room.temperature = 0;

        /* count total lights in the room */
        for (var j = 0; j < room.groups.length; j++) {
          for (var k = 0; k < room.groups[j].things.length; k++) {
            /* check if thing is a light switch or a dimmer */
            const category = room.groups[j].things[k].category;

            if (category == 'light_switches' || category == 'dimmers') {
              parsed_room.totalLights++;
            }
          }
        }
        rooms.push(parsed_room);
      }
      /* update room details */
      this.setState({
        rooms
      });

    } catch (err) {
      this.setState({
        rooms: []
      });
    }
  }

  lightsChanged() {

  }

  thermostatChanged() {

  }

  renderRoomCards() {
    const { rooms } = this.state;

    /* create room cards */
    const room_cards = [];
    for (var i = 0; i < rooms.length; i++) {
      room_cards.push(
        <RoomCard key={'room-' + rooms[i].id}
          name={rooms[i].name}
          icon={this._living_room_icon}
          totalLights={rooms[i].totalLights}
          lightsOn={rooms[i].lightsOn.length}
          temperature={rooms[i].temperature}
        />
      );
    }

    return room_cards;
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.imageContainer }>
          <Image source={ this._living_room } style={ styles.livingRoomImage } />
        </View>
        <View style={ styles.scrollContainer }>
          <Heading text="Rooms" />
          <ScrollView horizontal={ true }  contentContainerStyle={ styles.contentContainer}>
            { this.renderRoomCards() }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 8,
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10
  },
  livingRoomImage: {
    resizeMode: 'contain',
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
