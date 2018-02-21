/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import LightSwitch from './LightSwitch';
import type { LightSwitchType } from './LightSwitch';

import LightDimmer from './LightDimmer';
import type { LightDimmerType } from './LightDimmer';

import LightPresets from './LightPresets';
import type { LightPresetsType } from './LightPresets';

import { Colors } from '../../constants/styles';

import type { RoomType, GroupType, ThingMetadataType } from '../../js-api-utils/ConfigManager';

import ControlCard from './ControlCard';
import CardRow from './CardRow';
import Divider from './Divider';

type PropsType = {
  lights: Array<ThingMetadataType>
};
type StateType = {};

export default class LightsCard extends Component<PropsType, StateType> {
  _background: number = require('../../assets/images/lights_background.png');

  _formatLightControls(presets: Array<LightSwitchType>, dimmers: Array<LightDimmerType>, switches: Array<LightSwitchType>) {

    var lightControls = [];

    if (presets.length > 0){
      lightControls = lightControls.concat(presets);
      lightControls.push(<Divider key={ 'divider-1' } />);
    }
    if (dimmers.length > 0) {
      var formattedDimmers = [];
      for (var i = 0; i < dimmers.length; i++) {
        formattedDimmers.push(
          <CardRow key={ 'dimmer-' + i + '-cardrow' }>
            { dimmers[i] }
          </CardRow>
        );
      }

      lightControls = lightControls.concat(formattedDimmers);

      lightControls.push(<Divider key={ 'divider-2' } />);
    }
    if (switches.length > 0) {
      lightControls = lightControls.concat(switches);
    }

    return lightControls
  }

  _renderLightControls() {
    const { lights } = this.props;
    const presets = [];
    const dimmers = [];
    const switches = [];
    var lightControl = [];

    for (var i = 0; i < lights.length; i++) {
      var light: ThingMetadataType = lights[i];
      (light.category === 'light_switches') ?
        switches.push(<LightSwitch id={ light.id } key={ 'swtich-' + i } />)
        : dimmers.push(<LightDimmer id={ light.id } width={ 235 } height={ 40 } key={ 'dimmer-' + i } />);
    }

    return this._formatLightControls(presets, dimmers, switches);

  }

  render() {
    return (
      <ControlCard title={ 'Lights' }
        background={ this._background }>
        { this._renderLightControls() }
      </ControlCard>

    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 424,
    backgroundColor: 'grey',
  }
});
