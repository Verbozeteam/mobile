/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';

import RoomCard from './RoomCard';
import Heading from '../Heading';

type PropsType = {};
type StateType = {};

export default class RoomsSection extends Component<PropsType, StateType> {
  _living_room = require('../../assets/home/home-living-room.jpg');

  /* Room Type Icons */
  _living_room_icon = require('../../assets/home/living_room.png');

  _room_cards_details = [
    {
      name: "Living Room",
      icon: this._living_room_icon,
      totalLights: 10,
      lightsOn: 5,
      temperature: 23.5
    },
    {
      name: "Master Bedroom",
      icon: this._living_room_icon,
      totalLights: 4,
      lightsOn: 0,
      temperature: 27.0
    },
    {
      name: "Hamood's Bedroom",
      icon: this._living_room_icon,
      totalLights: 4,
      lightsOn: 0,
      temperature: 27.0
    },
    {
      name: "Kitchen",
      icon: this._living_room_icon,
      totalLights: 8,
      lightsOn: 4,
      temperature: 21.0
    },
    {
      name: "Bathroom",
      icon: this._living_room_icon,
      totalLights: 2,
      lightsOn: 0,
      temperature: 22.2
    },
  ];

  _renderRoomCards() {
    const room_cards = [];

    for (var i = 0; i < this._room_cards_details.length; i++) {
      room_cards.push(
        <RoomCard
          key={i}
          name={ this._room_cards_details[i].name }
          icon={ this._room_cards_details[i].icon }
          totalLights={ this._room_cards_details[i].totalLights }
          lightsOn={ this._room_cards_details[i].lightsOn }
          temperature={ this._room_cards_details[i].temperature }
        />
      )
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
            { this._renderRoomCards() }
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
