/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType, GroupType, ThingMetadataType } from '../../js-api-utils/ConfigManager';
import { TypeFaces } from '../../constants/styles';

import LightsCard from './LightsCard';
import ThermostatCard from './ThermostatCard';
import CurtainsCard from './CurtainsCard';

type PropsType = {
  roomId: string
};

type StateType = {};

export default class RoomControls extends Component<PropsType, StateType> {

  _screenWidth = Dimensions.get('screen').width;

  _supportedCategoryGroupType = {
    'light_switches': 'light_switches',
    'dimmers': 'light_switches',
    'curtains': 'curtains',
    'central_acs': 'central_acs'
  };

  _determineGroupCategoryType(cleanedGroupThings: Array<ThingMetadataType>) {
    var groupCategory = null;

    if (cleanedGroupThings) {
      groupCategory = this._supportedCategoryGroupType[cleanedGroupThings[0].category];
    }

    return groupCategory;

  }

  _renderLightsCard(index: number, things: Array<ThingMetadataType> ) {
    return (
      <LightsCard key={ index } lights={ things } />
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

      if (group && group.things) {
        const cleanedGroupThings = group.things.filter(t => t.category !== 'empty');
        groupCategory = this._determineGroupCategoryType(cleanedGroupThings);

        switch(groupCategory) {
          case 'light_switches':
            availableControlGroups.push(this._renderLightsCard(i, cleanedGroupThings));
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
      <View style={[styles.container, {width: this._screenWidth}]}>
        <ScrollView>
          { this._renderAvailableControlGroups(room) }
        </ScrollView>
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
