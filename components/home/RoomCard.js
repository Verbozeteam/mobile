/* @flow */

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

import { TypeFaces } from '../../constants/styles';

type PropsType = {
  name: string,
  icon: number,
  totalLights: number,
  lightsOn: number,
  temperature: number
};
type StateType = {};

export default class RoomCard extends Component<PropsType, StateType> {

  /* Room Stats Icons */
  _light_buld = require('../../assets/home/light_bulb.png');
  _thermometer = require('../../assets/home/thermometer.png');

  /* Implementing some responsiveness to this component */
  _default_width: number = 210;
  _card_opacity: number = 0; // Setting opacity to 0 and changing to 1 once resizing is done to avoid 'whoosh/pop' effect
  _adjusted_card: boolean = false;

  _default_icon_width: number = 68;
  _icon_opacity: number = 0;
  _adjusted_icon: boolean = false;


  _measure(evt: Object, type: string) {
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
    return (
        <View style={ [styles.container, {width: this._default_width, opacity: this._card_opacity}] }
          onLayout={ (evt) => this._measure(evt, 'card') }>
          <View style={ styles.cardIcon }>
            <Image style={{  height: '100%',  width: this._default_icon_width, opacity: this._icon_opacity }}
              source={ this.props.icon }
              onLayout={ (evt) => this._measure(evt, 'icon') }/>
          </View>
          <Text style={ styles.cardName }>
            { this.props.name }
          </Text>
          <View style={ styles.statsIcons }>
            <View style={ styles.statIcon }>
              <Image source={ this._light_buld }/>
            </View>
            <View style={ styles.statIcon }>
              <Image source={ this._thermometer } />
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
    height: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
    ...TypeFaces.room_card_name,
  },
  cardStats: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  statsText: {
    flex: 1,
    textAlign: 'center',
    ...TypeFaces.room_card_stats
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
