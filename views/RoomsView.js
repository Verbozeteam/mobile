/* @flow */

import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, StyleSheet, Dimensions,
  Platform } from 'react-native';

import { ConfigManager } from '../js-api-utils/ConfigManager';
import type { ConfigType, RoomType } from '../js-api-utils/ConfigManager';
import { Colors, Gradients, TypeFaces } from '../constants/styles';

import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Header } from 'react-navigation';

import RoomsTopTabBar from '../components/room/RoomsTopTabBar';
import RoomControls from '../components/room/RoomControls';

type PropsType = {
  navigation: Object
};

type StateType = {
  selected_room: string
};

export default class RoomsView extends Component<PropsType, StateType> {

  _scroll_view: null;
  _screen_width: number = Dimensions.get('screen').width;

  componentWillMount() {
    const { navigation } = this.props;

    /* set selected room from react-nativation params */
    this.setSelectedRoom(navigation.state.params.room_id);
  }

  setSelectedRoom(room_id: string | null, index?: number = -1,
    scroll?: boolean = true) {

    if (room_id == null && index < 0) {
      throw "room_id can't be null with index < 0";
    }

    /* room ID is null, get it using the index */
    if (room_id == null) {
      const rooms = ConfigManager.rooms;
      room_id = rooms[index].id;
    }

    /* change ID of selected room */
    this.setState({
      selected_room: room_id
    });

    /* animate scrolling to that view */
    if (scroll && index > -1 && this._scroll_view) {
      this._scroll_view.scrollTo({
        x: index * this._screen_width,
        animated: (Platform.OS == 'ios') ? false : true
      });
    }
  }

  onMomentumScrollEnd(evt: Event) {
    const scroll = evt.nativeEvent.contentOffset.x;
    const index = Math.round(scroll / this._screen_width);

    this.setSelectedRoom(null, index, false);
  }

  renderRoomControls() {
    const rooms = ConfigManager.rooms;

    const room_controls = [];
    for (var i = 0; i < rooms.length; i++) {
      room_controls.push(
        <RoomControls key={'room-controls-' + rooms[i].id}
          room_id={rooms[i].id}/>
      );
    }

    return room_controls;
  }

  render() {
    const { selected_room } = this.state;
    const rooms = ConfigManager.rooms;

    /* top margin as react-navigation header doesn't cause SafeAreaView to
     * be pushed down because it has position = absolute */
    const top_margin = Header.HEIGHT + ifIphoneX(24, 0);

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>

        {/* top padding because SafeAreaView ignores the tabbar in this case */}
        <View style={{height: top_margin}}></View>

        {/* intentionally using a normal view instead of a SafeAreaView */}
        <View style={styles.container}>

          <RoomsTopTabBar selected={selected_room}
            setSelectedRoom={this.setSelectedRoom.bind(this)}/>

          <ScrollView ref={(c) => this._scroll_view = c}
            horizontal={true}
            pagingEnabled={true}
            onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}>
            {this.renderRoomControls()}
          </ScrollView>
        </View>

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
