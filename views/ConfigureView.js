/* @flow */

import React, { Component } from 'react';
import { AsyncStorage, View, SafeAreaView, Text, Dimensions, StyleSheet }
  from 'react-native';
import { connect } from 'react-redux';

import { setWebSocketAddress } from '../actions/ConfigurationActions';

import LinearGradient from 'react-native-linear-gradient';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { Colors, Gradients, TypeFaces } from '../constants/styles';

type PropsType = {
  navigation: Object,

  setWebSocketAddress: (websocket_address: string) => void
};

type StateType = {
  connecting: boolean
};

const mapStateToProps = (state: Object) => {
  return {};
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setWebSocketAddress: (websocket_address: string) =>
      dispatch(setWebSocketAddress(websocket_address))
  };
};

class ConfigureView extends Component<PropsType, StateType> {

  state = {
    connecting: false
  };

  _camera_view_dimensions: {height: number, width: number};

  componentWillMount() {
    /* set height and width of camera view to be 90% of screen width */
    const screen_width = Dimensions.get('screen').width;
    this._camera_view_dimensions = {
      height: screen_width * 0.9,
      width: screen_width * 0.9
    };

    if (__DEV__) {
      this.onRead({data: 'wss://www.verboze.com/stream/35b4d595ef074543a2fa686650024d98/'});
    }
  }

  onRead(evt: Object) {
    const { setWebSocketAddress } = this.props;
    const token = evt.data;

    /* save token to AsyncStorage */
    try {
      AsyncStorage.setItem('@websocket_address', token, () => {
        setWebSocketAddress(token);

        this.setState({
          connecting: true
        });
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
      <SafeAreaView style={styles.container}>
        <Text style={TypeFaces.centered_header}>Configure</Text>
        <View style={styles.camera_view_container}>
          <View style={this._camera_view_dimensions}>
            <QRCodeScanner onRead={this.onRead.bind(this)}
              containerStyle={styles.camera_view}
              cameraStyle={camera_style} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  renderConnectingMessage() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={TypeFaces.centered_header}>Connecting...</Text>
      </SafeAreaView>
    );
  }

  render() {
    const { connecting } = this.state;

    var content = null;
    if (connecting) {
      content = this.renderConnectingMessage();
    } else {
      content = this.renderCameraView();
    }

    return (
      <LinearGradient colors={Gradients.background_dark}
        style={styles.container}>
        {content}
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
