/* @flow */

import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Gradients, TypeFaces } from '../constants/styles';

type PropsType = {};
type StateType = {};

export default class HomeView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    return (
      <LinearGradient colors={Gradients.background_dark}
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
    ...TypeFaces.centered_header
  }
});
