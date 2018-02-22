/* @flow */

import React, { Component } from 'react';

import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType, GroupType, ThingMetadataType, PresetType } from '../../js-api-utils/ConfigManager';
import { TypeFaces } from '../../constants/styles';

import LightsCard from './LightsCard';
import ThermostatCard from './ThermostatCard';
import CurtainsCard from './CurtainsCard';

type PropsType = {
  roomId: string
};

type StateType = {};

export default class RoomControls extends Component<PropsType, StateType> {

  _screen_width = Dimensions.get('screen').width;
  _screen_height = Dimensions.get('screen').height

  _supportedCategoryGroupType = {
    'light_switches': 'light_switches',
    'dimmers': 'light_switches',
    'curtains': 'curtains',
    'central_acs': 'central_acs'
  };

  _determineGroupCategoryType(cleanedGroupThings: Array<ThingMetadataType>) {
    var groupCategory = null;

    if (cleanedGroupThings.length > 0) {
      groupCategory = this._supportedCategoryGroupType[cleanedGroupThings[0].category];
    }

    return groupCategory;

  }

  _renderLightsCard(index: number, things: Array<ThingMetadataType>, presets?: Array<PresetType> = [] ) {
    return (
      <LightsCard key={ index } lights={ things } presets={ presets } />
    );
  }

  _renderThermostatCard(index: number, things: Array<ThingMetadataType>) {
    return (
      <ThermostatCard key={ index } />
    );
  }

  _renderCurtainCard(index: number, things: Array<ThingMetadataType>) {
    return (
      <CurtainsCard key={ index } />
    );
  }


  _renderAvailableControlGroups(room: RoomType) {

    const roomGroups = room.groups;

    var availableControlGroups = [];
    for (var i = 0; i < roomGroups.length; i++) {
      var group: GroupType = roomGroups[i];
      var groupCategory = null;

      if (Object.keys(group).length > 0 && group.things.length > 0) {
        const cleanedGroupThings = group.things.filter(t => t.category !== 'empty');
        groupCategory = this._determineGroupCategoryType(cleanedGroupThings);

        switch(groupCategory) {
          case 'light_switches':
            if (typeof group.presets !== 'undefined') {
              availableControlGroups.push(this._renderLightsCard(i, cleanedGroupThings, group.presets));
            }
            else{
              availableControlGroups.push(this._renderLightsCard(i, cleanedGroupThings));
            }
            break;
          case 'central_acs':
            availableControlGroups.push(this._renderThermostatCard(i, cleanedGroupThings));
            break;
          case 'curtains':
            availableControlGroups.push(this._renderCurtainCard(i, cleanedGroupThings));
            break;
        }

      }

    }

    return availableControlGroups;

  }

  render() {
    const { roomId } = this.props;

    const room: RoomType | null = ConfigManager.getRoom(roomId);

    return (
        <ScrollView contentContainerStyle={styles.control_container}
          style={[styles.container, {width: this._screen_width}]}>
          { this._renderAvailableControlGroups(room) }
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
