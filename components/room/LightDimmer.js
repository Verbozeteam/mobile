/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

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

  _screenWidth: number = Dimensions.get('screen').width;
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
    /* WAITING FOR FITURI TO FINISH WEBSOCKET STUFF */
    ConfigManager.setThingState(this.props.id, { intensity }, true);
  }


  render() {
    const { id, width, height } = this.props;
    const { intensity } = this.state;
    const { blockParentScroll, unblockParentScroll } = this.context;

    return (
      <View>
        <CardRow style={ styles.dimmerLabel }>
          <Text style={ TypeFaces.light_dimmer_label } >{ ConfigManager.thingMetas[id].name }</Text>
        </CardRow>
        <CardRow style={styles.container}>
          <MagicButton
            onPress={() => this.changeIntensity(intensity == 0 ? 100 : 0)}
            width={ 45 }
            height={ 45 }
            isOn={ intensity }
            text={ (intensity > 0) ? "On" : "Off" }
            glowColor={ Colors.red }
            textColor={ Colors.white }
            glowColor={ Colors.red_shadow }
            onColor={ Colors.red }
            textStyle={TypeFaces.magic_button}
            extraStyle={{ marginRight: 10 }}
          />
          <MagicSlider
            width={this._screenWidth - 95}
            height={ height }
            value={ intensity }
            maxValue={ 100 }
            glowColor={ this._glowColor }
            blockParentScroll={blockParentScroll}
            unblockParentScroll={unblockParentScroll}
            round={ (value: number) => Math.round(value) }
            onChange={ (_intensity) => this.changeIntensity(_intensity) }
          />
        </CardRow>
      </View>
    );
  };
}

LightDimmer.contextTypes = {
  blockParentScroll: PropTypes.func,
  unblockParentScroll: PropTypes.func
};

const styles = {
  container: {
    flexDirection: 'row'
  },
  dimmerLabel: {
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }

};
