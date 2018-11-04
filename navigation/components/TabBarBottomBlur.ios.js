/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { TabBarBottom } from 'react-navigation';
import { BlurView } from 'react-native-blur';

import { Colors } from '../../constants/styles';

type PropsType = {
  [string]: any
};

export const TabBarBottomBlur = (props: PropsType) => (
  <TabBarBottom {...props} />
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
    borderTopColor: Colors.dark_gray
  }
});
