/* @flow */

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType } from '../../js-api-utils/ConfigManager';

import { Colors, TypeFaces } from '../../constants/styles';

type PropsType = {
  room: RoomType,
  navigation: Object
};

type StateType = {
  total_lights: number,
  lights_on: [],
  temperature: number
};

class RoomCard extends Component<PropsType, StateType> {

  state = {
    total_lights: 0,
    lights_on: [],
    temperature: 0
  }

  /* room category icons */
  _room_icons = {
    'living_room': require('../../assets/home/living_room.png')
  };

  /* room stats icons */
  _light_bulb: number = require('../../assets/home/light_bulb.png');
  _thermometer: number = require('../../assets/home/thermometer.png');

  /* implementing some responsiveness to this component */
  _default_width: number = 210;
  _card_opacity: number = 0; // setting opacity to 0 and changing to 1 once resizing is done to avoid 'whoosh/pop' effect
  _adjusted_card: boolean = false;

  _default_icon_width: number = 68;
  _icon_opacity: number = 0;
  _adjusted_icon: boolean = false;

  getRoomIcon(category: string) {
    if (category in this._room_icons) {
      return this._room_icons[category];
    }

    /* return default as category doesn't have an icon */
    return this._room_icons['living_room'];
  }

  componentWillMount() {
    this.countTotalLights();
  }

  componentWillReceiveProps() {
    this.countTotalLights();
  }

  countTotalLights() {
    const { room } = this.props;

    var total_lights = 0;
    for (var i = 0; i < room.groups.length; i++) {
      for (var j = 0; j < room.groups[i].things.length; j++) {
        const category = room.groups[i].things[j].category;

        /* check if thing is a light switch or dimmer */
        if (category == 'light_switches' || category == 'dimmers') {
          total_lights++;
        }
      }
    }

    this.setState({
      total_lights
    });
  }

  measure(evt: Object, type: string) {
    if (type === 'card' && !this._adjusted_card){
      this._adjusted_card = true;
      this._default_width = evt.nativeEvent.layout.height * 0.95;
      this._card_opacity = 1;
      this.forceUpdate();
    }

    else if (type === 'icon' && !this._adjusted_icon){
      this._adjusted_icon = true;
      this._default_icon_width = evt.nativeEvent.layout.height * 1.26;
      this._icon_opacity = 1;
      this.forceUpdate();
    }
  }

  render() {
    const { room, navigation } = this.props;
    const { total_lights, lights_on, temperature } = this.state;

    const container_style: Object = {
      width: this._default_width,
      opacity: this._card_opacity
    };

    const card_icon_style: Object = {
      height: '100%',
      width: this._default_icon_width,
      opacity: this._icon_opacity
    };

    return (
      <TouchableOpacity activeOpacity={0.8}
       onPress={() => navigation.navigate('Rooms', {room_id: room.id})}>
        <View style={[styles.container, container_style]}
          onLayout={(evt) => this.measure(evt, 'card')}>
          <View style={styles.card_icon}>
            <Image style={card_icon_style}
              source={this.getRoomIcon(room.category)}
              onLayout={(evt) => this.measure(evt, 'icon')} />
          </View>

          <Text style={styles.card_name}>{room.name}</Text>

          <View style={styles.stats_icons}>
            <View style={styles.stat_icon}>
              <Image source={this._light_bulb} />
            </View>
            <View style={styles.stat_icon}>
              <Image source={this._thermometer} />
            </View>
          </View>

          <View style={styles.card_stats}>
            <Text style={styles.stat_text}>{lights_on.length} / {total_lights} ON</Text>
            <Text style={styles.stat_text}>{temperature}°C</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(RoomCard);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.transparent_black,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  card_icon: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card_name: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...TypeFaces.room_card_name,
  },
  card_stats: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  stat_text: {
    flex: 1,
    textAlign: 'center',
    ...TypeFaces.room_card_stats
  },
  stats_icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stat_icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
