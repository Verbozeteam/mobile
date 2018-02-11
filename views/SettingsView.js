/* @flow */

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView } from 'react-native';

import ConfigureView from './ConfigureView';

import LinearGradient from 'react-native-linear-gradient';

import { Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object
};
type StateType = {};

export default class SettingsView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  render() {
    const { navigation } = this.props;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <SafeAreaView>
          <Button
            title={'Configure'}
            onPress={() => navigation.navigate('Configure')} />
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }
});
