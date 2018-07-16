/* @flow */

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Colors, TypeFaces } from '../constants/styles';
import LoadingSpinner from '../assets/images/loading-spinner.gif';

type PropsType = {
  connectionStatus: 0 | 1 | 2
};

const LoadingOverlay = (props: PropsType) => {
  if (props.connectionStatus == 2) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={TypeFaces.centered_header}>
        {props.connectionStatus == 1 ? 'Connecting...' : 'Connection lost...'}
      </Text>
      {props.connectionStatus == 1 ?
        <Image source={LoadingSpinner} style={styles.spinner}
          resizeMode={'contain'} /> : null}
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    height: '30%',
    width: '30%'
  }
});
