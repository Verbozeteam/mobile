/* @flow */

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType } from '../../js-api-utils/ConfigManager';

import { BlurView } from 'react-native-blur';
import { Colors, TypeFaces } from '../../constants/styles';

type PropsType = {
  selected: string, /* ID of selected room */
  setSelectedRoom: (room_id: string, index: number) => null
};

type StateType = {};

export default class RoomsTopTabBar extends Component<PropsType, StateType> {

  renderSelectable(room: RoomType, index: number) {
    const { selected, setSelectedRoom } = this.props;

    const selectable_style = (selected == room.id) ?
      styles.selected : styles.non_selected;

    return (
      <TouchableHighlight key={'room-selectable-' + room.id}
        style={styles.selectable}
        underlayColor={Colors.gray}
        onPress={() => setSelectedRoom(room.id, index)}>

        <View style={selectable_style}>
          <Text style={TypeFaces.regular}>{room.name}</Text>
        </View>

      </TouchableHighlight>
    )
  }

  render() {
    const rooms: Array<RoomType> = ConfigManager.rooms;

    /* render selectables */
    const selectables = [];
    for (var i = 0; i < rooms.length; i++) {
      selectables.push(this.renderSelectable(rooms[i], i));
    }

    return (
      <View style={styles.container}>
        {/* horizontal ScrollView of the tab bar */}
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content_container}>

          {selectables}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.dark_gray
  },
  content_container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  selectable: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  non_selected: {
    height: 48,
    justifyContent: 'center'
  },
  selected: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.red
  }
});
