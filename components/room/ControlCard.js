/* @flow */

import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Heading from '../Heading';
import CardRow from'./CardRow';

type PropsType = {
  children?: React.Node,
  title: string,
  background: number
};

const ControlCard = (props: PropsType) => {
  return (
    <View style={styles.container}>
      {/* card background image */}
      <Image source={props.background} style={styles.background_image} />

      <View style={styles.controls}>
        <CardRow style={styles.title}>
          <Heading text={props.title} />
        </CardRow>

        {props.children}
      </View>
    </View>
  );
}

export default ControlCard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background_image: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  controls: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    justifyContent: 'flex-start',
    paddingLeft: 20,
  }
});
