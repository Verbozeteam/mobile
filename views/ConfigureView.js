/* @flow */

import React, { Component } from 'react';
import { AsyncStorage, View, SafeAreaView, Text, Dimensions, StyleSheet }
  from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setConfigurationToken } from '../actions/ConfigurationActions';

import LinearGradient from 'react-native-linear-gradient';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { Colors, Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object,

  setConfigurationToken: (configuration_token: string) => null
};

type StateType = {};

const mapStateToProps = (state: Object) => {
  return {};
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setConfigurationToken: (configuration_token: string) =>
      dispatch(setConfigurationToken(configuration_token))
  };
};

class ConfigureView extends Component<PropsType, StateType> {

  _camera_view_dimensions: {height: number, width: number};

  componentWillMount() {
    /* set height and width of camera view to be 90% of screen width */
    const screen_width = Dimensions.get('screen').width;
    this._camera_view_dimensions = {
      height: screen_width * 0.9,
      width: screen_width * 0.9
    };
  }

  onRead(evt: Object) {
    const { setConfigurationToken } = this.props;
    const token = evt.data;

    /* save token to AsyncStorage */
    try {
      AsyncStorage.setItem('configuration_token', token, () => {
        setConfigurationToken(token);
      });
    } catch (err) {
      console.error(err);
    }
  }

  renderCameraView() {
    /* create camera style allowing for padding for camera view borders */
    const camera_style = {
      height: this._camera_view_dimensions.height - 2,
      width: this._camera_view_dimensions.width - 2
    };

    return (
      <View style={styles.camera_view_container}>
        <View style={this._camera_view_dimensions}>
          <QRCodeScanner onRead={this.onRead.bind(this)}
            containerStyle={styles.camera_view}
            cameraStyle={camera_style} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Text style={TypeFaces.centered_header}>Configure</Text>
          {this.renderCameraView()}
          <View style={styles.helper_text_container}>
            <Text style={styles.helper_text}>
              Scan the QR code on a tablet on one of your walls
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    position: 'absolute',
    bottom: '50%',
    ...TypeFaces.centered_header
  },
  camera_view: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  camera_view_container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  helper_text_container: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  helper_text: {
    ...TypeFaces.regular,
    textAlign: 'center',
    width: '80%'
  }
});

ConfigureView = connect(mapStateToProps, mapDispatchToProps) (ConfigureView);
export default ConfigureView;
