/* @flow */

import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// import QRCodeScanner from 'react-native-qrcode-scanner';

import { Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object
};
type StateType = {};

export default class ConfigureView extends Component<PropsType, StateType> {

  static defaultProps = {

  };

  _camera_view_dimensions: {height: number, width: number};

  componentWillMount() {

    /* set height and width of camera view to be 90% of screen width */
    const screen_width = Dimensions.get('screen').width;
    this._camera_view_dimensions = {
      height: screen_width * 0.9,
      width: screen_width * 0.9
    };
  }

  _onRead(evt: Object) {
    console.log(evt.data);
  }

  // <QRCodeScanner onRead={this._onRead.bind(this)}
  //   showMarker={true} />

  _renderCameraView() {
    return (
      <View style={[styles.camera_view_container,
        this._camera_view_dimensions]}>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
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
  },
  camera_view_container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
