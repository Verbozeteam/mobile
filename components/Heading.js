/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, TypeFaces } from '../constants/styles'

type PropsType = {
  text: string,
  style?: number
};

const Heading = (props: PropsType) => {
  return (
    <View style={[styles.sectionHeaderContainer, props.style]}>
      <Text style={styles.sectionHeader}>{props.text}</Text>
    </View>
  )
}

export default Heading;

const styles = StyleSheet.create({
  sectionHeaderContainer: {
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
