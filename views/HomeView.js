/* @flow */

import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

type PropsType = {};
type StateType = {};

export default class HomeView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  _background_gradient: [string, string] = ['#1E1E1E', '#080808'];

  render() {
    return (
      <LinearGradient colors={this._background_gradient}
        style={styles.container}>
        <Text style={styles.header}>V E R B O Z E</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    bottom: '50%',
    color: '#FFFFFF',
    width: '100%',
    textAlign: 'center',
    fontSize: 40
  }
});
