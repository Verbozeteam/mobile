/* @flow */

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';

import { BlurView } from 'react-native-blur';
import { Colors, TypeFaces } from '../constants/styles';

type RoomType = {
  id: string,
  name: string
};

type PropsType = {
  rooms: Array<RoomType>,
  selected: string,
  changeSelectedRoom: () => null
};

type StateType = {};

export default class RoomsTopTabBar extends Component<PropsType, StateType> {

  static defaultProps = {
    rooms: []
  };

  renderSelectable(room: RoomType) {
    const { selected, changeSelectedRoom } = this.props;

    return (
      <TouchableHighlight key={'room-selectable-' + room.id}
        style={styles.selectable}
        underlayColor={Colors.gray}
        onPress={() => changeSelectedRoom(room.id)}>
        <View style={(selected == room.id) ? styles.selected : styles.non_selected}>
          <Text style={TypeFaces.regular}>{room.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { rooms } = this.props;

    /* render selectables */
    const selectables = [];
    for (var i = 0; i < rooms.length; i++) {
      selectables.push(this.renderSelectable(rooms[i]));
    }

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
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
