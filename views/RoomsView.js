/* @flow */

import * as React from 'react';
import { View, SafeAreaView, Text, ScrollView, StyleSheet, Dimensions }
  from 'react-native';

import { ConfigManager } from '../js-api-utils/ConfigManager';
import type { ConfigType, RoomType } from '../js-api-utils/ConfigManager';
import { Gradients, TypeFaces } from '../constants/styles';

import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Header } from 'react-navigation';

import RoomsTopTabBar from '../components/room/RoomsTopTabBar';
import RoomControls from '../components/room/RoomControls';

type PropsType = {
  navigation: Object
};

type StateType = {
  selected_id: string /* ID of selected room */,
  selected_index: number /* index of selected room */
};

export default class RoomsView extends React.Component<PropsType, StateType> {

  _scroll_view: ?React.Ref<ScrollView>;
  _screen_width: number = Dimensions.get('screen').width;

  componentWillMount() {
    const { navigation } = this.props;

    /* set selected room from react-navigation params */
    this.setSelectedRoom(-1, navigation.state.params.room_id, true);
  }

  scrollToRoom(index: number, animated?: boolean = true) {
    if (index > -1 && this._scroll_view) {
      this._scroll_view.scrollTo({
        x: index * this._screen_width,
        animated: animated
      });
    }
  }

  setSelectedRoom(index: number, room_id?: string | null = null,
    initial_scroll?: boolean = false) {

    if (index < 0 && room_id == null) {
      throw "index can't be less than 0 while room_id is null"
    }

    const rooms = ConfigManager.rooms;

    /* room ID is null, get is using the index */
    if (room_id == null) {
      room_id = rooms[index].id;
    }

    else if (index < 0) {
      index = rooms.findIndex((elem) => elem.id == room_id);
    }
    /* change selected room ID */
    this.setState({
      selected_id: room_id,
      selected_index: index
    });

    /* animate scrolling to selected room */
    if (initial_scroll) {
      /* scroll after first render so we have the ScrollView's ref */
      requestAnimationFrame(() => {
        this.scrollToRoom(index, false);
      });
    } else {
      this.scrollToRoom(index);
    }
  }

  onMomentumScrollEnd(evt: Event, length: number) {
    const scroll = evt.nativeEvent.contentOffset.x;
    var index = Math.round(scroll / this._screen_width);

    /* respect bounds - should never have to but just in case */
    if (index < 0) {
      index = 0;
    }
    else if (index > length - 1) {
      index = length - 1;
    }

    this.setSelectedRoom(index);
  }

  renderRoomControls() {
    const rooms = ConfigManager.rooms;

    const room_controls = [];
    for (var i = 0; i < rooms.length; i++) {
      room_controls.push(
        <RoomControls key={'room-controls-' + rooms[i].id}
          room_id={rooms[i].id} />
      );
    }

    return room_controls;
  }

  render() {
    const { selected_index } = this.state;
    const rooms = ConfigManager.rooms;

    /* top margin as react-navigation header doesn't cause SafeAreaView to
     * be pushed down because it has position = absolute */
    const top_margin = Header.HEIGHT + ifIphoneX(24, 0);

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>

        {/* top padding for topbar */}
        <View style={{height: top_margin}}></View>

        {/* intentionally using a normal view instead of a SafeAreaView */}
        <RoomsTopTabBar selectedIndex={selected_index}
          setSelectedRoom={this.setSelectedRoom.bind(this)} />

        {/* horizontal ScrollView for room controls */}
        <ScrollView ref={(c) => this._scroll_view = c}
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={(evt) =>
            this.onMomentumScrollEnd(evt, rooms.length)}>

          {this.renderRoomControls()}
        </ScrollView>

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
