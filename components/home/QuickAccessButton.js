/* @flow */

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { TypeFaces } from '../../constants/styles';

type PropsType = {
  name: string,
  icon: number,
  action: string,
};
type StateType = {};

export default class QuickAccessButton extends Component<PropsType, StateType> {

  _default_width: number = 90;

  _measure(evt: Object) {
    this._default_width = evt.nativeEvent.layout.height * 0.65
    this.forceUpdate();
  }

  render() {
    return (
      <View style={ [styles.quickAccessButtonContainer, { width: this._default_width }] }
        onLayout={(evt) => this._measure(evt)}>
        <Text style={ styles.nameText }>{ this.props.name }</Text>
        <View style={ styles.symbol }>
          <Image style={{ resizeMode: 'contain',  height: 42 }} source={ this.props.icon } />
        </View>
        <Text style={ styles.actionText }>{ this.props.action }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quickAccessButtonContainer: {
    flex: 1,
    alignItems: 'center',
    maxWidth: 90,
    maxHeight: 140,
    height: '100%',
    backgroundColor: '#191919',
    marginLeft: 10,
    marginRight: 10
  },
  nameText: {
    flex: 1,
    marginTop: 15,
    ...TypeFaces.quick_access_card_name
  },
  symbol: {
    flex: 2,
  },
  actionText: {
    flex: 1,
    ...TypeFaces.quick_access_card_action
  }
});
