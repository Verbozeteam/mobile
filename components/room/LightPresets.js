/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

import MagicSlider from '../../react-components/MagicSlider';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../../js-api-utils/ConfigManager';

type PropsType = {
  id: string,
};

type StateType = {};

export type LightPresetsType = {
  id: string,
};

export default class LightPresets extends Component<PropsType, StateType> {

  redner() {
    return (
      <Text>
        THIS IS A LIGHT PRESETS
      </Text>
    );
  }

}

