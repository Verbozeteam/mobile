/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Header } from 'react-navigation';
import { BlurView } from 'react-native-blur';

import { Colors } from '../../constants/styles';

type PropsType = {
  [string]: any
};

export const HeaderBlur = (props: PropsType) => (
  <BlurView blurAmount={10} blurType={'dark'} style={styles.blur}>
    <View style={styles.bottom_border}>
      <Header {...props} />
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  bottom_border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.dark_gray
  }
});
