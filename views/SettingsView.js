/* @flow */

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, AsyncStorage }
  from 'react-native';
import { connect } from 'react-redux';

import { resetConfiguration } from '../actions/ConfigurationActions';
import { WebSocketCommunication } from '../js-api-utils/WebSocketCommunication';
import { ConfigManager } from '../js-api-utils/ConfigManager';

import ConfigureView from './ConfigureView';
import LinearGradient from 'react-native-linear-gradient';

import { Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object,

  resetConfiguration: () => null
};

type StateType = {};

const mapStateToProps = (state: Object) => {
  return {};
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    resetConfiguration: () => dispatch(resetConfiguration())
  };
};

class SettingsView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  reset() {
    const { resetConfiguration } = this.props;
    resetConfiguration();
    WebSocketCommunication.reset();
    ConfigManager.reset();
    AsyncStorage.clear();
  }

  render() {
    const { navigation } = this.props;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <SafeAreaView>
          <Button
            title={'Configure'}
            onPress={() => navigation.navigate('Configure')} />
          <Button
            title={'Reset'}
            onPress={() => this.reset()} />
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

SettingsView = connect(mapStateToProps, mapDispatchToProps) (SettingsView);
export default SettingsView;
