/* @flow */

import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { Colors, TypeFaces } from '../../constants/styles';

import MagicButton from '../../react-components/MagicButton';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType, PresetType } from '../../js-api-utils/ConfigManager';

import CardRow from './CardRow';

type PropsType = {
  presets: Array<PresetType>
};

type StateType = {
  currentPreset: number,
};

export default class LightPresets extends Component<PropsType, StateType> {
  state: StateType = {
    currentPreset: -1,
  };

  _unsubscribe1: () => any = () => null;
  _unsubscribe2: () => any = () => null;

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps: PropsType) {
    this._unsubscribe1();
    this._unsubscribe2();
    this._unsubscribe1 = ConfigManager.registerCategoryChangeCallback('light_switches', this.onLightChanged.bind(this));
    this._unsubscribe2 = ConfigManager.registerCategoryChangeCallback('dimmers', this.onLightChanged.bind(this));
  }

  onLightChanged(meta: ThingMetadataType, lightState: ThingStateType) {
    const { currentPreset } = this.state;
    const { presets } = this.props;

    var newPreset = this.getCurrentPresetSwitchFromReduxState();

    if (currentPreset !== newPreset)
      this.setState({currentPreset: newPreset});
  }

  computeDistanceToPreset(preset: Object, state: Object) {
    for (var k in preset)
      if (state[k] == undefined)
        delete preset[k];
    var preset_intensity = Object.keys(preset).map((tid) => !preset[tid].intensity ? 0 : (state[tid].category == 'dimmers' ? preset[tid].intensity / 100 : preset[tid].intensity)).reduce((a, b) => a + b);
    var state_intensity = Object.keys(state).filter((k) => k in preset).map((tid) => !state[tid].intensity ? 0 : (state[tid].category == 'dimmers' ? state[tid].intensity / 100 : state[tid].intensity)).reduce((a, b) => a + b);
    return Math.abs(preset_intensity - state_intensity);
  }

  getCurrentPresetSwitchFromReduxState() {
    const { presets } = this.props;
    var distances = [];
    var lowest_dist = 100000;
    var lowest_dist_index = -1;
    for (var i = 0; i < presets.length; i++) {
      distances.push(this.computeDistanceToPreset(presets[i], ConfigManager.things));
      if (distances[i] < lowest_dist) {
        lowest_dist = distances[i];
        lowest_dist_index = i;
      }
    }

    if (lowest_dist_index == 0 && distances[0] > 0.01)
      lowest_dist_index++;
    else if (lowest_dist_index == distances.length - 1 && distances[distances.length-1] > 0.01)
      lowest_dist_index--;

    return lowest_dist_index;
  }

  activatePreset(preset: PresetType) {
    ConfigManager.setThingsStates(preset, true);
  }

  render() {
    const { currentPreset } = this.state;
    const { presets } = this.props;
    var presetButtons = [];
    for (var i = 0; i < presets.length; i++) {
      const index = i;
      presetButtons.push(
        <MagicButton
          key={ 'presetbutton-' + i }
          onPress={() => this.activatePreset(presets[index])}
          haptic={() => ReactNativeHapticFeedback.trigger('impactMedium')}
          isOn={ currentPreset === index }
          text={ i + 1 }
          textStyle={TypeFaces.magic_button}
          offColor={Colors.gray}
          glowColor={Colors.red}/>
      );
    }

    return (

     <CardRow style={ styles.presetControls }>
        <Text style={[TypeFaces.light, {paddingRight: 10}]}>Presets</Text>
        {presetButtons}
      </CardRow>

    );
  }

}

const styles = {
  presetControls: {
    paddingRight: 37,
    paddingLeft: 37,
    justifyContent: 'space-around'
  }
};
