/* @flow */

import React, { Component } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Gradients, TypeFaces } from '../constants/styles';

import ControlCardsSection from '../components/room/ControlCardsSection';


type PropsType = {};
type StateType = {};

export default class RoomsView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <SafeAreaView style={ styles.safeArea }>
          <ControlCardsSection />
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
