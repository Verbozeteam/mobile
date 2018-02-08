/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { TabBarBottom } from 'react-navigation';
import { BlurView } from 'react-native-blur';

type PropsType = {};

export const TabBarBottomBlur = (props: PropsType) => (
  <BlurView blurAmount={10} blurType={'dark'} style={styles.container}>
    <View style={styles.top_border}>
      <TabBarBottom {...props} />
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  top_border: {
    borderTopWidth: 0.5,
    borderTopColor: '#333333'
  }
});
