/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

type PropsType = {
  text: string
};
type StateType = {};

export default class Heading extends Component<PropsType, StateType> {
  render(){
    return (
      <View style={ styles.sectionHeaderContainer }>
        <Text style={ styles.sectionHeader }>{ this.props.text }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    marginLeft: 20,
    borderBottomColor: '#BA3737',
    borderBottomWidth: 3,
    alignSelf: 'flex-start'
  },
  sectionHeader: {
    paddingTop: 15,
    color: '#FFFFFF',
    textAlign: 'left',
    fontSize: 22,
  },
});

