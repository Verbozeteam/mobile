/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { Colors, TypeFaces } from '../constants/styles'

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
    borderBottomColor: Colors.red,
    borderBottomWidth: 3,
    alignSelf: 'flex-start'
  },
  sectionHeader: {
    paddingTop: 15,
    textAlign: 'left',
    ...TypeFaces.section_and_card_heading
  },

});

