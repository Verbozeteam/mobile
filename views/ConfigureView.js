/* @flow */

import * as React from 'react';
import { View, Text, Button, SafeAreaView, Dimensions, StyleSheet }
  from 'react-native';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import LocalStorage from '../js-api-utils/LocalStorage';
import { setWebSocketAddress } from '../actions/ConfigurationActions';

import LinearGradient from 'react-native-linear-gradient';
import { Colors, Gradients, TypeFaces } from '../constants/styles';
import QRCodeScanner from 'react-native-qrcode-scanner';

type PropsType = {
  navigation: Object,

  setWebSocketAddress: (websocket_address: string) => void
};

type StateType = {
  connecting: boolean,
  reattempt: boolean,
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

class ConfigureView extends React.Component<PropsType, StateType> {

  state = {
    connecting: false,
    reattempt: false,
  };

  /* QR code scanner node reference */
  _qr_code_scanner: React.Ref<QRCodeScanner>;

  _camera_view_dimensions: {height: number, width: number};

  componentWillMount() {
    /* set height and width of camera view to be 90% of screen width */
    const screen_width = Dimensions.get('screen').width;
    this._camera_view_dimensions = {
      height: screen_width * 0.9,
      width: screen_width * 0.9
    };
  }

  componentDidMount() {
    console.log('ConfigureView mounted');
  }

  componentWillUnmount() {
    console.log('ConfigureView will unmount');
  }

  onRead(evt: Object) {
    const { setWebSocketAddress, navigation } = this.props;
    const { params } = navigation.state;
    const shouldNavigateToHome = params ? params.shouldNavigateToHome : false;
    const websocket_address = evt.data;

    console.log('onRead', websocket_address);

    if (!this.validateWss(websocket_address)) {
      this._qr_code_scanner.reactivate();
      this.setState({
        reattempt: true
      });

      return;
    }

    LocalStorage.store(LocalStorage.keys.websocket_address, websocket_address,
      () => {
        setWebSocketAddress(websocket_address);

        if (shouldNavigateToHome) {
          Promise.all([
            navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Settings'})
              ]
            }))
          ]).then(() => navigation.navigate('Home'));
        }

        else {
          this.setState({
            connecting: true
          });
        }

      });
  }

  validateWss(address): boolean {
    // TODO: this can be improved?
    const wss_index = address.indexOf('wss://');
    const ws_index = address.indexOf('ws://');

    if (wss_index === 0 || ws_index === 0) {
      return true;
    }

    return false;
  }

  forceRead() {
    this.onRead({data:
      'wss://www.verboze.com/stream/3f4d765a-2b60-4425-ab5e-5fa82d219df9/'});
  }

  renderCameraPermissionView() {
    return (
      <View style={styles.container}>
        <Text style={TypeFaces.centered_header}>
          Please give the camera permission.
        </Text>
      </View>
    );
  }

  renderCameraView() {
    const { reattempt } = this.state;

    var reattempt_text = null;
    if (reattempt) {
      reattempt_text = (
        <Text style={styles.helper_text}>
          Please try again
        </Text>
      );
    }

    var force_read_button = null;
    if (__DEV__) {
      force_read_button = (
        <Button title={'Force Read'}
          onPress={this.forceRead.bind(this)} />
      );
    }

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
            <QRCodeScanner ref={(c) => this._qr_code_scanner = c}
              reactivate={true}
              reactivateTimeout={1000}
              notAuthorizedView={this.renderCameraPermissionView()}
              onRead={this.onRead.bind(this)}
              containerStyle={styles.camera_view}
              cameraStyle={camera_style} />
          </View>
        </View>
        <View style={styles.helper_text_container}>
          {reattempt_text}
          <Text style={styles.helper_text}>
            Scan the QR code on a tablet on one of your walls
          </Text>
        </View>
        {force_read_button}
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
    alignItems: 'center',
  },
  helper_text: {
    ...TypeFaces.regular,
    textAlign: 'center',
    width: '80%'
  }
});

ConfigureView = connect(mapStateToProps, mapDispatchToProps) (ConfigureView);
export default ConfigureView;
