/* @flow */

import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';

import { ConfigManager } from '../js-api-utils/ConfigManager';
import type { ConfigType, RoomType } from '../js-api-utils/ConfigManager';
import { Gradients, TypeFaces } from '../constants/styles';

import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Header } from 'react-navigation';

import RoomsTopTabBar from '../components/RoomsTopTabBar';

type PropsType = {
  navigation: Object
};

type StateType = {
  selected_room: string
};

export default class RoomsView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  componentWillMount() {
    const { navigation } = this.props;

    this.setState({
      selected_room: navigation.state.params.room_id
    });
  }

  componentWillReceiveProps() {
    const { navigation } = this.props;

    this.setState({
      selected_room: navigation.state.params.room_id
    });
  }

  changeSelectedRoom(room_id: string) {
    this.setState({
      selected_room: room_id
    });
  }

  render() {
    const { selected_room } = this.state;
    const rooms = ConfigManager.config.rooms;

    /* top margin as react-navigation header doesn't cause SafeAreaView to
     * be pushed down because it has position = absolute */
    const top_margin = Header.HEIGHT + ifIphoneX(24, 0);

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <View style={{height: top_margin}}></View>
        <SafeAreaView style={styles.container}>
          <RoomsTopTabBar rooms={ConfigManager.config.rooms}
            selected={selected_room}
            changeSelectedRoom={this.changeSelectedRoom.bind(this)}/>
        </SafeAreaView>
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
});
