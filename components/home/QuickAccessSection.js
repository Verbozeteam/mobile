/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Heading from '../Heading';
import QuickAccessButton from './QuickAccessButton'

type PropsType = {};
type StateType = {};

export default class QuickAccessSection extends Component<PropsType, StateType> {

  _front_door_icon = require('../../assets/home/front_door.png');
  _ceiling_light = require('../../assets/home/ceiling_light.png');

  _quick_access_buttons_details = [
    {
      name: "Front Door",
      icon: this._front_door_icon,
      action: "Unlock",
    },
    {
      name: "All Lights",
      icon: this._ceiling_light,
      action: "Turn Off"
    }
  ];

  _renderQuickAccessButtons() {
    const quick_access_cards = [];

    for (var i = 0; i < this._quick_access_buttons_details.length; i++) {
      quick_access_cards.push(
        <QuickAccessButton
          key={ i }
          name={ this._quick_access_buttons_details[i].name }
          icon={ this._quick_access_buttons_details[i].icon }
          action={ this._quick_access_buttons_details[i].action } />
      );
    }
    return quick_access_cards;
  }

  render() {
    return (
      <View style={styles.container}>
    <Heading text="Quick Access" />
    <ScrollView horizontal={ true } contentContainerStyle={ styles.contentContainer}>
      { this._renderQuickAccessButtons() }
    </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  contentContainer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  }
});
