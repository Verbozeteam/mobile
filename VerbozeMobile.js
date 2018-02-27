/* @flow */

import React, { Component } from 'react';
import { StatusBar, Platform, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import { ConfigManager } from './js-api-utils/ConfigManager';
import { WebSocketCommunication } from './js-api-utils/WebSocketCommunication';
import { setUsersName, setWebSocketAddress, setConnectionStatus }
  from './actions/ConfigurationActions';

import MainNavigator from './navigation/MainNavigator';
import FirstConfigureStack from './navigation/FirstConfigureStack';

import { dummy_config } from './dummy_config';

type PropsType = {
  users_name: string,
  websocket_address: string,

  setUsersName: (users_name: string) => void,
  setWebSocketAddress: (websocket_address: string) => void,
  setConnectionStatus: (connection_status: 0 | 1 | 2) => void
};

type StateType = {};

const mapStateToProps = (state: Object) => {
  return {
    users_name: state.configuration.users_name,
    websocket_address: state.configuration.websocket_address,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setUsersName: (users_name: string) =>
      dispatch(setUsersName(users_name)),

    setWebSocketAddress: (websocket_address: string) =>
      dispatch(setWebSocketAddress(websocket_address)),

    setConnectionStatus: (connection_status: 0 | 1 | 2) =>
      dispatch(setConnectionStatus(connection_status))
  };
};

class VerbozeMobile extends Component<PropsType, StateType> {

  _unsubscribe: () => boolean = () => false;

  _configuration_code: number = 0;

  componentWillMount() {
    this._unsubscribe =
      ConfigManager.registerConfigChangeCallback((config) => {
        this.setCachedConfiguration(JSON.stringify(config));
        this.forceUpdate();
      });

    /* set status bar color to light */
    Platform.OS === 'ios' ? StatusBar.setBarStyle('light-content', true) : StatusBar.setBackgroundColor('#1E1E1E');

    /* clear all AsyncStorage for development purposes */
    if (__DEV__) {
      // AsyncStorage.clear();
    }

    ConfigManager.initialize(WebSocketCommunication);
    ConfigManager.setOnConfigReceived(this.configurationReceived.bind(this));

    /* get user's name, websocket address and cached configuration */
    this.getUsersName();
    this.getWebsocketAddress();
    this.getCachedConfiguration();

    this.setupWebSocketCommunication();
  }

  componentWillReceiveProps(nextProps: PropsType) {
    const { websocket_address } = nextProps;

    if (websocket_address && WebSocketCommunication.url !== websocket_address) {
      this.connectWebSocket(websocket_address);
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  configurationReceived() {
    const { setConnectionStatus } = this.props;

    /* update connection status */
    setConnectionStatus(2);
  }

  setupWebSocketCommunication() {
    const { setConnectionStatus } = this.props;

    /* request {code: 0} once connected */
    WebSocketCommunication.setOnConnected(() => {
      console.log('WebSocket connected');

      // if (__DEV__) {
      ConfigManager.onMiddlewareUpdate(dummy_config);
      // } else {
        // WebSocketCommunication.sendMessage({code: this._configuration_code});
      // }
      setConnectionStatus(1);
    });

    WebSocketCommunication.setOnDisconnected(() => {
      console.log('WebSocket disconnected');
      setConnectionStatus(0);
    });

    WebSocketCommunication.setOnError((err?: Object = {}) => {
      console.log('WebSocket error', err);
      setConnectionStatus(0);
    });
  }

  connectWebSocket(address: string) {
    const { setConnectionStatus } = this.props;

    setConnectionStatus(1);

    try {
      WebSocketCommunication.connect(address);
    } catch (err) {
      console.log('WebSocketCommunication failed to connect', err);
    }
  }

  async getUsersName() {
    const { setUsersName } = this.props;

    /* get user's name from AsyncStorage and set to state if exists */
    try {
      const users_name = await AsyncStorage.getItem('@users_name');
      if (users_name !== null) {
        setUsersName(users_name);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getWebsocketAddress() {
    const { setWebSocketAddress } = this.props;

    /* get configuration token from AsyncStorage and set to state if exist */
    try {
      const address = await AsyncStorage.getItem('@websocket_address');
      if (address !== null) {
        setWebSocketAddress(address);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCachedConfiguration() {
    /* get cached configuration from AsyncStorage and set ConfigManager
      if exists */
    try {
      const config = await AsyncStorage.getItem('@cached_configuration');
      if (config !== null) {
        if (!ConfigManager.hasConfig) {
          ConfigManager.setConfig(JSON.parse(config));
          this.forceUpdate();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  setCachedConfiguration(config) {
    try {
      AsyncStorage.setItem('@cached_configuration', config);
    } catch (err) {
      console.log(err);
    }
  }

  checkConfigurationCompleted(): boolean {
    const { users_name, websocket_address } = this.props;
    console.log(users_name, websocket_address);

    if (users_name && typeof users_name == 'string' &&
      websocket_address && typeof websocket_address == 'string') {

      return true;
    }

    return false;
  }

  render() {
    const configuration_completed = this.checkConfigurationCompleted();

    if (configuration_completed && ConfigManager.hasConfig) {
      return <MainNavigator />;
    } else {
      return <FirstConfigureStack />;
    }
  }
}

VerbozeMobile = connect(mapStateToProps, mapDispatchToProps) (VerbozeMobile);
export default VerbozeMobile;
