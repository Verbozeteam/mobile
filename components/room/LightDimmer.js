/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CardRow from './CardRow';

import { Colors, TypeFaces } from '../../constants/styles';

import MagicSlider from '../../react-components/MagicSlider';
import MagicButton from '../../react-components/MagicButton';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../../js-api-utils/ConfigManager';

type PropsType = {
  id: string,
  width: number,
  height: number,
};

type StateType = {
  intensity: number,
};

export type LightDimmerType = {
  id: string,
};

export default class LightDimmer extends Component<PropsType, StateType> {

  _minus_icon: number = require('../../assets/icons/minus.png');
  _plus_icon: number = require('../../assets/icons/plus.png');

  _unsubscribe: () => any = () => null;

  _glowColor = Colors.red;

  state = {
    intensity: 0,
  };

  onLightChanged(meta: ThingMetadataType, lightState: ThingStateType) {
    const { intensity } = this.state;

    if (lightState.intensity !== intensity) {
      this.setState({
        intensity: lightState.intensity
      });
    }
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


  changeIntensity(intensity: number) {
    console.log("CHANGING INTENSITY");
    console.log(intensity);
    /* WAITING FOR FITURI TO FINISH WEBSOCKET STUFF */
    // ConfigManager.setThingState(this.props.id, { intensity }, true);
  }


  render() {
    const { width, height } = this.props;
    const { intensity } = this.state;

    return (
      <View>
        <CardRow style={ styles.dimmerLabel }>
          <Text style={ TypeFaces.light_dimmer_label } >Table Lamp</Text>
        </CardRow>
        <CardRow>
          <View style={ styles.container }>
            <MagicButton onPress={() => null}
              width={ 40 }
              height={ 40 }
              icon={ this._minus_icon }
              showBorder={ false }
              glowColor={ Colors.red }
            />
            <MagicSlider
              width={ width }
              height={ height }
              value={ intensity }
              maxValue={ 100 }
              glowColor={ this._glowColor }
              round={ (value: number) => Math.round(value) }
              onChange={ (_intensity) => this.changeIntensity(_intensity) }
            />
            <MagicButton onPress={() => null}
              width={ 40 }
              height={ 40 }
              icon={ this._plus_icon }
              showBorder={ false }
              glowColor={ Colors.red }
            />
          </View>
        </CardRow>
      </View>
    );
  };
}


const styles = {
  container: {
    flexDirection: 'row'
  },
  dimmerLabel: {
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }

};