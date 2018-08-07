/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType }
from '../../js-api-utils/ConfigManager';

import { Colors, TypeFaces } from '../../constants/styles';
import I18n from '../../js-api-utils/i18n/i18n';

import MagicButton from '../../react-components/MagicButton';
import CardRow from './CardRow';
import ControlCard from './ControlCard';
import Divider from './Divider';

type PropsType = {
  name: string,
  meta: ThingMetadataType
};

type StateType = {
  room_service: number,
  do_not_disturb: number
};

export default class ServicesCard extends Component<PropsType, StateType> {

  state = {
    room_service: 0,
    do_not_disturb: 0
  };

  _unsubscribe: () => boolean = () => false;

  _background: number = require('../../assets/images/services_background.png');

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps: PropsType) {
    const { meta } = nextProps;

    this._unsubscribe();
    this._unsubscribe =
      ConfigManager.registerThingStateChangeCallback(
        meta.id, this.onChange.bind(this));
      if (meta.id in ConfigManager.things) {
        this.onChange(ConfigManager.thingMetas[meta.id],
          ConfigManager.things[meta.id]);
      }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onChange(meta: ThingMetadataType, service_state: ThingStateType) {
    const { room_service, do_not_disturb } = this.state;

    if (room_service !== service_state.room_service ||
      do_not_disturb !== service_state.do_not_disturb) {

      this.setState({
        room_service: service_state.room_service,
        do_not_disturb: service_state.do_not_disturb
      });
    }
  }

  toggleRoomService() {
    const { meta } = this.props;
    const { room_service, do_not_disturb } = this.state;

    ConfigManager.setThingState(meta.id, {
      room_service: 1 - room_service,
      do_not_disturb: 0
    }, true);
  }

  toggleDoNotDisturb() {
    const { meta } = this.props;
    const { room_service, do_not_disturb } = this.state;

    ConfigManager.setThingState(meta.id, {
      room_service: 0,
      do_not_disturb: 1 - do_not_disturb
    }, true);
  }

  renderRoomServiceButton() {
    const { room_service } = this.state;

    return (
      <CardRow style={{justifyContent: 'flex-start', alignItems: 'center'}}>
        <MagicButton text={room_service ? "On" : "Off"}
          onPress={this.toggleRoomService.bind(this)}
          isOn={room_service}
          sideText={'House Keeping'}
          glowColor={Colors.green}
          textColor={Colors.white}
          textStyle={TypeFaces.magic_button}
          sideTextStyle={{marginLeft: 10, lineHeight: 15, flexShrink: 1,
            ...TypeFaces.light_switch_label}} />
      </CardRow>
    );
  }

  renderDoNotDisturbButton() {
    const { do_not_disturb } = this.state;

    return (
      <CardRow style={{justifyContent: 'flex-start', alignItems: 'center'}}>
        <MagicButton text={do_not_disturb ? "On" : "Off"}
          onPress={this.toggleDoNotDisturb.bind(this)}
          isOn={do_not_disturb}
          sideText={'Do Not Disturb'}
          glowColor={Colors.red}
          textColor={Colors.white}
          textStyle={TypeFaces.magic_button}
          sideTextStyle={{marginLeft: 10, lineHeight: 15, flexShrink: 1,
            ...TypeFaces.light_switch_label}} />
      </CardRow>
    );
  }

  render() {
    const { name } = this.props;

    return (
      <ControlCard title={name}
      background={this._background}>

        {this.renderRoomServiceButton()}
        <Divider />
        {this.renderDoNotDisturbButton()}

      </ControlCard>
    );
  }
}

const styles = StyleSheet.create({

});
