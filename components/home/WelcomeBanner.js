/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

type PropsType = {
  name: string
};
type StateType = {};

export default class WelcomeBanner extends Component<PropsType, StateType> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome, { this.props.name }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  header: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    paddingLeft: 20,

    ...Platform.select({
      ios: {
        fontSize: 30,
      },
      android: {
        fontSize: 32,
      },
    }),

  }
});
