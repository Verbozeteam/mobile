/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, TypeFaces } from '../../constants/styles';

type PropsType = {
  name: string,
  connectionStatus: 0 | 1 | 2,
  hideConnectionStatus: boolean
};

type StateType = {};

export default class WelcomeBanner extends Component<PropsType, StateType> {

  static defaultProps = {
    connectionStatus: 0,
    hideConnectionStatus: false
  };

  renderConnectionStatus() {
    const { connectionStatus } = this.props;

    var backgroundColor: string = '';
    switch (connectionStatus) {
      case 0:
        backgroundColor = Colors.red;
        break;
      case 1:
        backgroundColor = Colors.orange;
        break;
      case 2:
        backgroundColor = Colors.green;
        break;
    }

    return (
      <View style={styles.connection_status_container}>
        <View style={[styles.connection_status, {backgroundColor}]}></View>
      </View>
    );
  }

  render() {
    const { name, hideConnectionStatus } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome, {name}</Text>
        {(hideConnectionStatus) ? null : this.renderConnectionStatus()}
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
    borderRadius: 20
  }
});
