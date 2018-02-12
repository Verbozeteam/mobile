/* @flow */

import React, { Component } from 'react';
import { Text, StyleSheet, Button } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object
};
type StateType = {};

export default class ConfigureView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    const { navigation } = this.props;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <Text style={styles.header}>Configure</Text>
        <Button
          title={'Done'}
          onPress={() => navigation.navigate('Welcome')} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    bottom: '50%',
    ...TypeFaces.centered_header
  }
})
