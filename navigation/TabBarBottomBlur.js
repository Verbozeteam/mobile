/* @flow */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { TabBarBottom } from 'react-navigation';
import { BlurView } from 'react-native-blur';

type PropsType = {};

export const TabBarBottomBlur = (props: PropsType) => (
  <BlurView blurAmount={10} blurType={'dark'} style={styles.container}>
    <TabBarBottom {...props} />
  </BlurView>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  }
});
