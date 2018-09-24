/* @flow */

import * as React from 'react';
import { View, Text, Image, Button, SafeAreaView, Dimensions, StyleSheet }
  from 'react-native';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import LocalStorage from '../js-api-utils/LocalStorage';
import { setWebSocketAddress } from '../actions/ConfigurationActions';

import LinearGradient from 'react-native-linear-gradient';
import { Colors, Gradients, TypeFaces } from '../constants/styles';
import LoadingSpinner from '../assets/images/loading-spinner.gif';
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
    const qrcode_address = evt.data;

    console.log('onRead', qrcode_address);

    var websocket_address = '';

    /* add trailing / if not there */
    if (qrcode_address.charAt(qrcode_address.length-1) !== '/')
      qrcode_address += '/';

    // extract token from qrcode_address
    const token = qrcode_address.substring(qrcode_address.substring(0,
      qrcode_address.lastIndexOf('/')).lastIndexOf('/') + 1).slice(0, -1);

    // check token is valid uuid4
    const re = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!re.test(token)) {
      this._qr_code_scanner.reactivate();
      this.setState({
        reattempt: true
      });

      return;
    }

    // create websocket address
    if (this.checkWebsocket(qrcode_address)) {
      websocket_address = qrcode_address;
    }

    else {
      websocket_address = qrcode_address.replace('/qrcode/', '/stream/');
      if (qrcode_address.indexOf('https') != -1) {
        websocket_address = websocket_address.replace('https', 'wss');
      } else {
        websocket_address = websocket_address.replace('http', 'ws');
      }
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

  checkWebsocket(address): boolean {
    const wss_index = address.indexOf('wss://');
    const ws_index = address.indexOf('ws://');

    if (wss_index === 0 || ws_index === 0) {
      return true;
    }

    return false;
  }

  forceRead() {
    this.onRead({data: ''});
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
            Scan the QR code
          </Text>
        </View>
        {force_read_button}
      </SafeAreaView>
    );
  }

  renderConnectingMessage() {
    return (
      <SafeAreaView style={styles.connecting_container}>
        <Text style={TypeFaces.centered_header}>Connecting...</Text>
        <Image source={LoadingSpinner} style={styles.spinner}
          resizeMode={'contain'} />
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  connecting_container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  spinner: {
    height: '30%',
    width: '30%'
  }
});

ConfigureView = connect(mapStateToProps, mapDispatchToProps) (ConfigureView);
export default ConfigureView;
