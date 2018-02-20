/* @flow */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';

type PropsType = {
  children?: React.Node,
  rows?: number,
  style?: Object
};

const CardRow = (props: PropsType) => {
  var height = 60;
  if (typeof props.rows != 'undefined') {
    height = props.rows * height;
  }

  return (
    <View style={[styles.container, {height}, props.style]}>
      {props.children}
    </View>
  );
}

export default CardRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
});
