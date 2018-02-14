/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { TypeFaces } from '../../constants/styles';

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
    backgroundColor: 'transparent',
    paddingLeft: 20,
    marginTop: 25,
    ...TypeFaces.welcome_banner
  }
});
