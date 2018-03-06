/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Platform }
  from 'react-native';
import PropTypes from 'prop-types';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType, GroupType, ThingMetadataType, PresetType } from '../../js-api-utils/ConfigManager';
import { TypeFaces } from '../../constants/styles';

import { ifIphoneX } from 'react-native-iphone-x-helper'

import LightsCard from './LightsCard';
import ThermostatCard from './ThermostatCard';
import CurtainsCard from './CurtainsCard';
import ServicesCard from './ServicesCard';

type PropsType = {
  roomId: string
};

type StateType = {
  should_scroll: boolean
};

export default class RoomControls extends Component<PropsType, StateType> {

  state = {
    should_scroll: true
  };

  _screen_width: number = Dimensions.get('screen').width;
  _screen_height: number = Dimensions.get('screen').height

  _tabbar_height: number = (Platform.OS == 'ios') ? ifIphoneX(83, 49) : 0;

  _supportedCategoryGroupType = {
    'light_switches': 'light_switches',
    'dimmers': 'light_switches',
    'curtains': 'curtains',
    'central_acs': 'central_acs',
    'hotel_controls': 'hotel_controls',
  };

  getChildContext() {
    return {
      blockParentScroll: () => this.changeScrolling(false),
      unblockParentScroll: () => this.changeScrolling(true)
    };
  }

  _determineGroupCategoryType(cleanedGroupThings: Array<ThingMetadataType>) {
    var groupCategory = null;

    if (cleanedGroupThings.length > 0) {
      groupCategory = this._supportedCategoryGroupType[cleanedGroupThings[0].category];
    }

    return groupCategory;
  }

  _renderLightsCard(index: number, name: string,
    things: Array<ThingMetadataType>, presets?: Array<PresetType> = [] ) {

    return (
      <LightsCard key={'lights-card-' + index}
        name={name}
        lights={things}
        presets={presets} />
    );
  }

  _renderThermostatCard(index: number, meta: Array<ThingMetadataType>) {
    return (
      <ThermostatCard key={'thermostat-card-' + index}
        meta={meta[0]} />
    );
  }

  _renderCurtainCard(index: number, name: string,
    meta: Array<ThingMetadataType>) {

    return (
      <CurtainsCard key={'curtains-card-' + index}
        name={name}
        meta={meta} />
    );
  }

  _renderServicesCard(index: number, name: string,
    meta: Array<ThingMetadataType>) {

    return (
      <ServicesCard key={'services-card-' + index}
        name={name}
        meta={meta[0]} />
    );
  }


  _renderAvailableControlGroups(room: RoomType) {

    const roomGroups = room.groups;

    const light_controls = [];
    const curtain_controls = [];
    const thermostat_controls = [];
    const service_controls = [];

    for (var i = 0; i < roomGroups.length; i++) {
      var group: GroupType = roomGroups[i];
      var groupCategory = null;

      if (Object.keys(group).length > 0 && group.things.length > 0) {
        const cleanedGroupThings = group.things.filter(t => t.category !== 'empty');
        groupCategory = this._determineGroupCategoryType(cleanedGroupThings);

        switch(groupCategory) {
          case 'light_switches':
            if (typeof group.presets !== 'undefined') {
              light_controls.push(this._renderLightsCard(i, group.name,
                cleanedGroupThings, group.presets));
            }
            else{
              light_controls.push(this._renderLightsCard(i, group.name,
                cleanedGroupThings));
            }
            break;
          case 'curtains':
            curtain_controls.push(this._renderCurtainCard(i, group.name,
              cleanedGroupThings));
            break;
          case 'central_acs':
            thermostat_controls.push(this._renderThermostatCard(i, cleanedGroupThings));
            break;

          case 'hotel_controls':
            service_controls.push(this._renderServicesCard(i, group.name,
              cleanedGroupThings));
            break;
        }
      }
    }

    return [].concat(light_controls, curtain_controls, thermostat_controls,
      service_controls);
  }

  changeScrolling(should_scroll: boolean) {
    this.setState({
      should_scroll
    });
  }

  render() {
    const { should_scroll } = this.state;
    const { roomId } = this.props;

    const room: RoomType | null = ConfigManager.getRoom(roomId);

    return (
        <ScrollView contentContainerStyle={styles.control_container}
          scrollEnabled={should_scroll}
          style={[styles.container, {width: this._screen_width}]}>
          { this._renderAvailableControlGroups(room) }
          <View style={{height: this._tabbar_height}}></View>
        </ScrollView>
    );
  }
}

RoomControls.childContextTypes = {
  blockParentScroll: PropTypes.func,
  unblockParentScroll: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  control_container: {
    paddingVertical: 10
  }
});
