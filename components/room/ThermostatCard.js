/* @flow */

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

import { Colors, TypeFaces } from '../../constants/styles';

import Heading from '../Heading';
import Divider from './Divider';
import MagicThermostatSlider from '../../react-components/MagicThermostatSlider';
import MagicButton from '../../react-components/MagicButton';

type PropsType = {};
type StateType = {
  temperature: number,
  room_temperature: number
};

export default class ThermostatCard extends Component<PropsType, StateType> {

  state = {
    set_pt: 0,
    temp: 0,
    fan: 0,
    fan_speeds: [],
    temperature: 22.5,
    room_temperature: 25.0
  };

  _min_temp: number = 16;
  _max_temp: number = 32;

  _background: number = require('../../assets/images/thermostat_background.png');
  _minus_icon: number = require('../../assets/icons/minus.png');
  _plus_icon: number = require('../../assets/icons/plus.png');
  _screen_width: number = Dimensions.get('screen').width;

  roundTemperature(temperature: number) {
    return (Math.round(temperature * 2) / 2).toFixed(1);
  }

  updateTemperature(temperature: number) {
    console.log('temperature', temperature);
    this.setState({
      temperature
    });
  }

  changeTemperature(send_socket: boolean) {

  }

  changeFan(speed: number) {

  }

  renderTemperatureAndButtons() {
    const { temperature } = this.state;

    const increment = () =>
      this.updateTemperature(
        this.roundTemperature(Math.min(temperature + 0.5, this._max_temp)));

    const decrement = () =>
      this.updateTemperature(
        this.roundTemperature(Math.max(temperature - 0.5, this._min_temp)));

    return (
      <View style={styles.row}>
        <View style={{marginLeft: 30}}>
          <MagicButton onPress={decrement.bind(this)}
            icon={this._minus_icon}
            showBorder={false}
            offColor={Colors.gray}
            glowColor={Colors.red}/>
        </View>
        <View style={{flex: 1}}>
          <Text style={TypeFaces.thermostat_temperature}>{temperature} ºC</Text>
        </View>
        <View style={{marginRight: 30}}>
          <MagicButton onPress={increment.bind(this)}
            icon={this._plus_icon}
            showBorder={false}
            glowColor={Colors.red}/>
        </View>
      </View>
    );
  }

  renderTemperatureSlider() {
    const { temperature } = this.state;

    return (
      <View style={styles.double_row}>
        <MagicThermostatSlider width={this._screen_width - 40}
          round={this.roundTemperature.bind(this)}
          onChange={this.updateTemperature.bind(this)}
          margin={40}
          height={55}
          value={temperature}
          minTemp={this._min_temp}
          maxTemp={this._max_temp} />
      </View>
    );
  }

  renderRoomTemperature() {
    const { room_temperature } = this.state;

    return (
      <View style={styles.row}>
        <Text style={TypeFaces.light}>{room_temperature} ºC Room Temperature</Text>
      </View>
    );
  }

  renderFanControls() {
    return (
      <View style={[styles.row, styles.fan_controls]}>
        <Text style={[TypeFaces.light, {paddingRight: 10}]}>Fan</Text>
        <MagicButton onPress={() => null}
          text={'Off'}
          textColor={Colors.white}
          textFontSize={TypeFaces.light.fontSize}
          offColor={Colors.gray}
          glowColor={Colors.red}/>
        <MagicButton onPress={() => null}
          text={'Lo'}
          textColor={Colors.white}
          textFontSize={TypeFaces.light.fontSize}
          offColor={Colors.gray}
          glowColor={Colors.red}/>
        <MagicButton onPress={() => null}
          text={'Hi'}
          textColor={Colors.white}
          textFontSize={TypeFaces.light.fontSize}
          offColor={Colors.gray}
          glowColor={Colors.red}/>
      </View>
    );
  }

  render() {
    const { temperature, room_temperature } = this.state;

    return (
      <View style={styles.container}>
        {/* card background image */}
        <Image source={this._background} style={styles.background_image} />

        <View style={styles.controls}>
          <View style={[styles.row, {justifyContent: 'flex-start'}]}>
            <Heading text={'Thermostat'} />
          </View>

          {this.renderTemperatureAndButtons()}
          {this.renderTemperatureSlider()}
          {this.renderRoomTemperature()}
          <Divider />
          {this.renderFanControls()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_image: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  controls: {
    paddingTop: 10,
    paddingBottom: 10
  },
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
