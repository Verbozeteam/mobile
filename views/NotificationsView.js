/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Gradients, TypeFaces } from '../constants/styles';

type PropsType = {};
type StateType = {};

export default class NotificationsView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <SafeAreaView>
          <View style={{flex: 2}}></View>
          <Text style={TypeFaces.centered_header}>No notifications</Text>
          <View style={{flex: 3}}></View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
