/* @flow */

import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, TypeFaces } from '../../constants/styles';

import MagicButton from '../../react-components/MagicButton';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../../js-api-utils/ConfigManager';

import CardRow from './CardRow';

type PropsType = {
  children?: React.Node,
};

type StateType = {};

export default class LightPresets extends Component<PropsType, StateType> {

  render() {
    return (

     <CardRow style={ styles.presetControls }>
        <Text style={[TypeFaces.light, {paddingRight: 10}]}>Presets</Text>

        { this.props.children }

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
