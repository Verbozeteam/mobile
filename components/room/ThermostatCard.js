/* @flow */

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback }
  from 'react-native';
import PropTypes from 'prop-types';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { ThingStateType, ThingMetadataType } from '../../js-api-utils/ConfigManager';

import { Colors, TypeFaces } from '../../constants/styles';

import ControlCard from './ControlCard';
import CardRow from './CardRow';
import Divider from './Divider';
import MagicThermostatSlider from '../../react-components/MagicThermostatSlider';
import MagicButton from '../../react-components/MagicButton';

type PropsType = {
  meta: ThingMetadataType
};

type StateType = {
  set_pt: number,
  temp: number,
  fan: number,
  fan_speeds: Array<string>,
};

export default class ThermostatCard extends Component<PropsType, StateType> {

  state = {
    set_pt: 0,
    temp: 0,
    fan: 0,
    fan_speeds: ['Off'],
  };

  _unsubscribe: () => boolean = () => false;

  _min_temp: number = 16;
  _max_temp: number = 32;

  _background: number = require('../../assets/images/thermostat_background.png');
  _minus_icon: number = require('../../assets/icons/minus.png');
  _plus_icon: number = require('../../assets/icons/plus.png');
  _screen_width: number = Dimensions.get('screen').width;

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

  onChange(meta: ThingMetadataType, thermostat_state: ThingStateType) {
    var { set_pt, temp, fan, fan_speeds } = this.state;

    if ('set_pt' in thermostat_state && set_pt !== thermostat_state.set_pt) {
      set_pt = thermostat_state.set_pt
    }

    if ('temp' in thermostat_state && temp !== thermostat_state.temp) {
      temp = thermostat_state.temp;
    }

    if ('fan' in thermostat_state && fan !== thermostat_state.fan) {
      fan = thermostat_state.fan;
    }

    if ('fan_speeds' in thermostat_state &&
      JSON.stringify(fan_speeds) !== JSON.stringify(meta.fan_speeds)) {

      fan_speeds = ['Off'].concat(meta.fan_speeds);
    }

    this.setState({
      set_pt,
      temp,
      fan,
      fan_speeds
    });
  }

  roundTemperature(temperature: number): number {
    return (Math.round(temperature * 2) / 2);
  }

  updateTemperature(temperature: number) {
    const { meta } = this.props;
    ConfigManager.setThingState(meta.id, {set_pt: temperature}, true);
  }

  incrementTemperature() {
    const { set_pt } = this.state;
    this.updateTemperature(Math.min(set_pt + 0.5, this._max_temp));
  }

  decrementTemperature() {
    const { set_pt } = this.state;
    this.updateTemperature(Math.max(set_pt - 0.5, this._min_temp));
  }

  changeFan(speed: number) {
    const { meta } = this.props;
    ConfigManager.setThingState(meta.id, {fan: speed}, true);
  }

  renderTemperatureAndButtons() {
    const { set_pt, fan, fan_speeds } = this.state;
    console.log('set_pt', set_pt);

    const thermostat_text: string = (fan > 0) ?
      (set_pt.toFixed(1) + 'ºC') : 'Off';

    const turnOn = () => {
      console.log('turnOn clicked');
      if (fan === 0 && fan_speeds.length > 1) {
        this.changeFan(1);
      }
    }

    return (
      <CardRow>
        <View style={{marginLeft: 30}}>
          <MagicButton onPress={this.decrementTemperature.bind(this)}
            icon={this._minus_icon}
            iconStyle={{}}
            showBorder={false}
            enabled={fan > 0 && set_pt > this._min_temp}
            offColor={Colors.gray}
            glowColor={Colors.red}/>
        </View>
        <TouchableWithoutFeedback onPress={turnOn}>
          <View style={{flex: 1}}>
            <Text style={TypeFaces.thermostat_temperature}>{thermostat_text}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{marginRight: 30}}>
          <MagicButton onPress={this.incrementTemperature.bind(this)}
            icon={this._plus_icon}
            iconStyle={{}}
            showBorder={false}
            enabled={fan > 0 && set_pt < this._max_temp}
            offColor={Colors.gray}
            glowColor={Colors.red}/>
        </View>
      </CardRow>
    );
  }

  renderTemperatureSlider() {
    const { set_pt, fan} = this.state;
    const { blockParentScroll, unblockParentScroll } = this.context;

    return (
      <CardRow rows={2}>
        <MagicThermostatSlider width={this._screen_width - 40}
          round={this.roundTemperature.bind(this)}
          onChange={this.updateTemperature.bind(this)}
          margin={40}
          height={55}
          value={set_pt}
          enabled={fan > 0}
          blockParentScroll={blockParentScroll}
          unblockParentScroll={unblockParentScroll}
          minTemp={this._min_temp}
          maxTemp={this._max_temp} />
      </CardRow>
    );
  }

  renderRoomTemperature() {
    const { temp } = this.state;
    console.log('temp', temp);

    return (
      <CardRow>
        <Text style={TypeFaces.light}>Room Temperature {temp.toFixed(1)} ºC </Text>
      </CardRow>
    );
  }

  renderFanControls() {
    const { fan, fan_speeds } = this.state;

    const speeds = [];
    for (var i = 0; i < fan_speeds.length; i++) {
      const speed = i;
      speeds.push(
        <MagicButton key={'fan-speed-' + i}
          onPress={() => this.changeFan(speed)}
          text={fan_speeds[i]}
          textStyle={TypeFaces.magic_button}
          isOn={fan === i}
          offColor={Colors.gray}
          glowColor={Colors.red}/>
      );
    }

    return (
      <CardRow style={styles.fan_controls}>
        <Text style={[TypeFaces.light, {paddingRight: 10}]}>Fan</Text>
        {speeds}
      </CardRow>
    );
  }

  render() {
    return (
      <ControlCard title={'Thermostat'}
        background={this._background}>

        {this.renderTemperatureAndButtons()}
        {this.renderTemperatureSlider()}
        {this.renderRoomTemperature()}
        <Divider />
        {this.renderFanControls()}

      </ControlCard>
    );
  }
}

ThermostatCard.contextTypes = {
  blockParentScroll: PropTypes.func,
  unblockParentScroll: PropTypes.func
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  double_row: {
    flexDirection: 'row',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  fan_controls: {
    paddingRight: 37,
    paddingLeft: 37,
    justifyContent: 'space-around'
  }
});
