/* @flow */

import * as React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet, Dimensions }
  from 'react-native';

import { ConfigManager } from '../../js-api-utils/ConfigManager';
import type { RoomType } from '../../js-api-utils/ConfigManager';

import { Colors, TypeFaces } from '../../constants/styles';

type PropsType = {
  selectedIndex: number, /* index of seleted tab */
  setSelectedRoom: (index: number, room_id: string) => null
};

type StateType = {};

export default class RoomsTopTabBar extends React.Component<PropsType, StateType> {

  _scroll_view: ?React.Ref<ScrollView>;
  _screen_width: number = Dimensions.get('screen').width;
  _scroll_view_width: number = -1;
  _positions: Array<number> = [];

  componentWillMount() {
    const rooms: Array<RoomType> = ConfigManager.rooms;
    const { selectedIndex } = this.props;

    this._positions = new Array(rooms.length);

    /* first render - get width of ScrollView */
    requestAnimationFrame(() => {
      /* second render - calculate positions of tabs (uses ScrollView width) */
      requestAnimationFrame(() => {
        /* third render - scroll ScrollView to position selected tab */
        requestAnimationFrame(() => {
          this.scrollToTab(selectedIndex, false);
        })
      });
    });
  }

  componentWillReceiveProps(nextProps: PropsType) {
    const { selectedIndex } = nextProps;
    this.scrollToTab(selectedIndex);
  }

  measureTab(evt: Event, index: number) {
    /* align position of tab to middle of the screen for scrolls */
    var position = evt.nativeEvent.layout.x +
      (evt.nativeEvent.layout.width / 2) - (this._screen_width / 2);

    requestAnimationFrame(() => {
      /* if most left, align to left of screen rather than middle */
      if (position < 0) {
        position = 0;
      }

      /* if most right, align to right of sreen rather than middle */
      if (position > this._scroll_view_width - this._screen_width) {
        position = this._scroll_view_width - this._screen_width;
      }

      this._positions[index] = position;
    });
  }

  scrollToTab(index: number, animated?: boolean = true) {
    if (index > -1 && this._scroll_view) {
      this._scroll_view.scrollTo({
        x: this._positions[index],
        animated: animated
      });
    }
  }

  renderTab(room: RoomType, index: number, selected: boolean) {
    const { setSelectedRoom } = this.props;

    const tab_style = (selected) ? styles.selected : styles.non_selected;

    return (
      <TouchableHighlight key={'room-tab-' + room.id}
        onLayout={(evt) => this.measureTab(evt, index)}
        style={styles.tab}
        underlayColor={Colors.gray}
        onPress={() => setSelectedRoom(index, room.id)}>

        <View style={tab_style}>
          <Text style={TypeFaces.regular}>{room.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { selectedIndex } = this.props;
    const rooms: Array<RoomType> = ConfigManager.rooms;

    /* render tabs */
    const tabs = [];
    for (var i = 0; i < rooms.length; i++) {
      tabs.push(this.renderTab(rooms[i], i, selectedIndex == i));
    }

    return (
      <View style={styles.container}>

        {/* horizontal ScrollView of the tab bar */}
        <ScrollView ref={(c) => this._scroll_view = c}
          onContentSizeChange={(width, height) =>
            this._scroll_view_width = width}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content_container}>

          {tabs}
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
  tab: {
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
