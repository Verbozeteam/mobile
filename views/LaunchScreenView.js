/* @flow */

import React, { Component } from 'react';
import { View, SafeAreaView, Image, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Gradients } from '../constants/styles';

type PropsType = {};

type StateType = {};

const _logo = require('../assets/images/logo/verboze_logo.png');

const LaunchScreenView = () => {
  return (
    <LinearGradient colors={Gradients.background_dark}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logo_container}>
          <Image source={_logo}
            resizeMode={'contain'} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default LaunchScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
