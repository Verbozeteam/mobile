/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, TypeFaces } from '../../constants/styles';

type PropsType = {
  name: string,
  connection_status: 0 | 1 | 2
};

type StateType = {};

export default class WelcomeBanner extends Component<PropsType, StateType> {

  static defaultProps = {
    connection_status: 0
  };

  renderConnectionStatus() {
    const { connection_status } = this.props;

    return (
      <View style={styles.connection_status_container}>
        <View style={styles.connection_status}></View>
      </View>
    );
  }

  render() {
    const { name } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome, {name}</Text>
        {this.renderConnectionStatus()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
  },
  header: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    marginTop: 25,
    ...TypeFaces.welcome_banner
  },
  connection_status_container: {
    position: 'absolute',
    right: 0,
    height: '100%',
    paddingRight: 20,
    justifyContent: 'center',
  },
  connection_status: {
    height: 10,
    width: 10,
    backgroundColor: Colors.red,
    borderRadius: 20
  }
});
