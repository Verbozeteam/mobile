/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, TypeFaces } from '../../constants/styles';

import MagicButton from '../../react-components/MagicButton';

type PropsType = {
  name: string,
  open: () => void,
  close: () => void,
  stop: () => void
};

type StateType = {};

export default class CurtainControl extends Component<PropsType, StateType> {
  _stop_icon: number = require('../../assets/icons/stop.png');

  render() {
    const { name, open, close, stop } = this.props;

    return (
      <View style={styles.container}>
        <Text style={TypeFaces.light}>{name}</Text>

        <View style={styles.controls}>
          <MagicButton text={'Open'}
            onPressIn={open}
            onPressOut={stop}
            width={80}
            extraStyle={{marginRight: 2.5}}
            textStyle={TypeFaces.magic_button}
            offColor={Colors.gray}
            glowColor={Colors.red} />
          <MagicButton text={'Close'}
            onPressIn={close}
            onPressOut={stop}
            width={80}
            extraStyle={{marginRight: 5}}
            textStyle={TypeFaces.magic_button}
            offColor={Colors.gray}
            glowColor={Colors.red} />
          <MagicButton icon={this._stop_icon}
            iconStyle={{}}
            onPress={stop}
            offColor={Colors.gray}
            glowColor={Colors.red} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
