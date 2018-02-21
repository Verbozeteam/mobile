/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MagicButton from '../../react-components/MagicButton';

import { Colors } from '../../constants/styles';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../../js-api-utils/ConfigManager';

type PropsType = {
  id: string
};

type StateType = {
  intensity: number,
};

export type LightSwitchType = {
  id: string,
};

export default class LightSwtich extends Component<PropsType, StateType> {

  state = {
    intensity: 0,
  }

  _unsubscribe: () => null = () => null;

  onLightChanged(meta: ThingMetadataType, lightState: ThingStateType) {
    const { intensity } = this.state;

    if (lightState.intensity !== intensity) {
      this.setState({
        intensity: lightState.intensity
      });
    }

  }

  changeIntensity(intensity: number) {
    ConfigManager.setThingState(this.props.id, {intensity}, true);
  }

  componentWillReceiveProps(newProps: PropsType) {
    this._unsubscribe();
    if (newProps.id) {
      this._unsubscribe = ConfigManager.registerThingStateChangeCallback(newProps.id, this.onLightChanged.bind(this));
      if (newProps.id && newProps.id in ConfigManager.things){
        this.onLightChanged(ConfigManager.thingMetas[newProps.id], ConfigManager.things[newProps.id]);
      }
    }
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { id } = this.props;
    var { intensity } = this.state;

    var myCategory = 'light_switches';

    if(id) {
      myCategory = ConfigManager.thingMetas[id].category;
    }

    var intensityAfterSwitch = 1 - intensity;

    /* Waiting for fituri to implement the websocket stuff inorder for this to work */
    // var onPress = (() => this.changeIntensity(intensityAfterSwitch));

    return (
      <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
        <MagicButton
          width={ 45 }
          height={ 45 }
          extraStyle={{ marginRight: 10 }}
          isOn={ intensity }
          text={ (intensity > 0) ? "On" : "Off" }
          textColor={ '#ffffff' }
          glowColor={ Colors.red_shadow }
          onColor={ Colors.red }
          // onPress={ onPress }
          sideText={!id ? "ALL" : ConfigManager.thingMetas[id].name.toUpperCase()}
          sideTextStyle={{ marginLeft: 10, lineHeight: 45 }}
        />
      </View>
    );
  }
}
