/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';

import LightSwitch from './LightSwitch';
import type { LightSwitchType } from './LightSwitch';

import LightDimmer from './LightDimmer';
import type { LightDimmerType } from './LightDimmer';

import LightPresets from './LightPresets';

import { Colors, TypeFaces } from '../../constants/styles';

import MagicButton from '../../react-components/MagicButton';

import type { RoomType, GroupType, ThingMetadataType, PresetType } from '../../js-api-utils/ConfigManager';

import ControlCard from './ControlCard';
import CardRow from './CardRow';
import Divider from './Divider';

type PropsType = {
  lights: Array<ThingMetadataType>,
  presets?: Array<PresetType>
};
type StateType = {};

export default class LightsCard extends Component<PropsType, StateType> {
  _background: number = require('../../assets/images/lights_background.png');

  _formatLightControls(presets: Array<PresetType>, dimmers: Array<LightDimmerType>, switches: Array<LightSwitchType>) {

    var lightControls = [];

    if (presets.length > 0){
      lightControls.push(
        <LightPresets key={ 'presets-stuff' } presets={presets} />
      );

      lightControls.push(<Divider key={ 'divider-1' } />);
    }
    if (dimmers.length > 0) {
      var formattedDimmers = [];
      for (var i = 0; i < dimmers.length; i++) {
        formattedDimmers.push(dimmers[i]);
      }

      lightControls = lightControls.concat(formattedDimmers);

      lightControls.push(<Divider key={ 'divider-2' } />);
    }
    if (switches.length > 0) {
      var formattedSwitches = [];
      var lightSwitchRow = [];
      var startNewRow;
      for (var i = 0; i < switches.length; i++) {
        /* since want 2 lightswtiches per row
        *  we determine when is the new row based on the if
        *  the index of lightswitch is divisble by 2 or not
        */
        startNewRow = i % 2; /* 0 -> add to same row | 1 -> start new row after this */
        lightSwitchRow.push(
          <View style={{ flex: 1 }} key={ 'lightswitchview-' + i } >
            { switches[i] }
          </View>
        );
        if (startNewRow) {
          formattedSwitches.push(
            <CardRow key={ 'lightswitchrow-' + i }
            style={{ }}>
              { lightSwitchRow }
            </CardRow>
          );
          lightSwitchRow = [];
        }
      }
      /* odd number of lights */
      if (lightSwitchRow.length > 0) {
        formattedSwitches.push(
          <CardRow key={ 'lightswitchrow-' + i }
          style={{  }}>
            { lightSwitchRow }
          </CardRow>
        )
      }

      lightControls = lightControls.concat(formattedSwitches);
    }

    return lightControls
  }

  _renderLightControls() {
    const { lights, presets } = this.props;
    const dimmers = [];
    const switches = [];
    var lightControl = [];

    /* splitting light switches and dimmers */
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
