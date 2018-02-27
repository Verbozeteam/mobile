/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../../js-api-utils/ConfigManager';
const { TimeoutHandler } = require('../../js-api-utils/TimeoutHandler');


import { Colors } from '../../constants/styles';

import ControlCard from './ControlCard';
import CardRow from './CardRow';
import Divider from './Divider';
import CurtainControl from './CurtainControl';

type PropsType = {
  name: string,
  meta: Array<ThingMetadataType>
};

type StateType = {
  curtains: {[string]: Object}
};

export default class CurtainsCard extends Component<PropsType, StateType> {

  state = {
    curtains: {}
  };

  _unsubscribe: () => boolean = () => false;
  _background: number = require('../../assets/images/curtains_background.png');

  // curtain-id -> time it was clicked
  _curtainClickTimes : {[string]: number} = {};

  componentWillMount() {
    const { meta } = this.props;

    this._unsubscribe =
      ConfigManager.registerCategoryChangeCallback(
        'curtains', this.onChange.bind(this));

    for (var i = 0; i < meta.length; i++) {
      var tid = meta[i].id;
      this.state.curtains[tid] = {curtain: 0};
      if (tid in ConfigManager.things)
        this.onChange(
          ConfigManager.thingMetas[tid], ConfigManager.things[tid]);
    }
  }

  onChange(meta: ThingMetadataType, curtain_state: ThingStateType) {
    const { curtains } = this.state;
    if (meta.id in curtains) {
      if (curtain_state.curtain !== curtains[meta.id]) {
        TimeoutHandler.clearTimeout(meta.id);
        this.setState({
          curtains: {...curtains, ... {[meta.id]: {curtain: curtain_state.curtain}}}
        });
      }
    }
  }

  setCurtainValue(curtains: Array<ThingMetadataType>) {
    return ((value: number) => {
      var totalUpdate = {};
      var curTime = (new Date()).getTime();
      for (var i = 0; i < curtains.length; i++) {
        if (value !== 0) { // first click, record the time
          this._curtainClickTimes[curtains[i].id] = curTime;
        } else { // ending the click, if too short, then let the curtain auto move
          if (curTime - this._curtainClickTimes[curtains[i].id] < 500) {
            const c = curtains[i];
            const v = value;
            TimeoutHandler.createTimeout(
              curtains[i].id,
              curtains[i].max_move_time || 2000,
              (() => this.setCurtainValue([c])(0)).bind(this));
            continue; // don't perform the update on this curtain, auto update will do it
          }
        }
        totalUpdate[curtains[i].id] = {curtain: value};
        this.state.curtains[curtains[i].id].curtain = value;
      }

      if (Object.keys(totalUpdate).length > 0) {
        this.forceUpdate();
        ConfigManager.setThingsStates(totalUpdate, true);
      }
    }).bind(this);
  }

  renderCurtain(meta: Array<ThingMetadataType>, name: string,index: number) {
    return (
      <CardRow key={'curtain-control-' + index}>
        <CurtainControl name={name}
          open={() => this.setCurtainValue(meta)(1)}
          close={() => this.setCurtainValue(meta)(2)}
          stop={() => this.setCurtainValue(meta)(0)} />
      </CardRow>
    );
  }

  render() {
    const { meta, name } = this.props;

    const curtain_controls = [];
    for (var i = 0; i < meta.length; i++) {
      curtain_controls.push(this.renderCurtain([meta[i]], meta[i].name, i));
    }

    return (
      <ControlCard title={name}
        background={this._background}>

        {this.renderCurtain(meta, 'All', meta.length)}

        <Divider />
        {curtain_controls}

      </ControlCard>
    );
  };
}

const styles = StyleSheet.create({

});
