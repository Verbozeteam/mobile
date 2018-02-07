/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PropsType = {};
type StateType = {};

export default class HomeView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>V E R B O Z E</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
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
