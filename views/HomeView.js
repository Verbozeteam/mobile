/* @flow */

import React, { Component } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import WelcomeBanner from '../components/home/WelcomeBanner';
import RoomsSections from '../components/home/RoomsSection';
import QuickAccessSection from '../components/home/QuickAccessSection';

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
        <SafeAreaView style={ styles.safeArea }>
          <WelcomeBanner name="Mohammed" />
          <RoomsSections />
          <QuickAccessSection />
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1
  }
});
