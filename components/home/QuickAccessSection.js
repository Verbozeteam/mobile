/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

type PropsType = {};
type StateType = {};

export default class QuickAccessSection extends Component<PropsType, StateType> {

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
  }
});
