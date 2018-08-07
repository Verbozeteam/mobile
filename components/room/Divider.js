/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}></View>
    </View>
  );
}

export default Divider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 20,
    paddingRight: 20
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.gray
  }
});
