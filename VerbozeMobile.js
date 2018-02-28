/* @flow */

import React, { Component } from 'react';
import { AppState, StatusBar, Platform, AsyncStorage } from 'react-native';
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
  connection_status: 0 | 1 | 2,

  setUsersName: (users_name: string) => void,
  setWebSocketAddress: (websocket_address: string) => void,
  setConnectionStatus: (connection_status: 0 | 1 | 2) => void
};

type StateType = {
  appState: string
};

const mapStateToProps = (state: Object) => {
  return {
    users_name: state.configuration.users_name,
    websocket_address: state.configuration.websocket_address,
    connection_status: state.configuration.connection_status
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

  state = {
    appState: AppState.currentState
  };

  _unsubscribe: () => boolean = () => false;

  _configuration_code: number = 0;

  _configuration_interval: IntervalID;

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

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  componentWillReceiveProps(nextProps: PropsType) {
    const { websocket_address } = nextProps;

    if (websocket_address && WebSocketCommunication.url !== websocket_address) {
      this.connectWebSocket(websocket_address);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
    this._unsubscribe();
  }

  handleAppStateChange(nextAppState: string) {
    const { connection_status, websocket_address } = this.props;
    const { appState } = this.state;

    /* check if app moved from inactive or background to foreground */
    if (appState && appState.match(/inactive|background/) &&
      nextAppState === 'active') {
      console.log('app moved to foreground');

      /* if WebSocket not connected, connect immediately */
      if (connection_status < 1) {
        console.log('app state invoked websocket connection.')
        this.connectWebSocket(websocket_address);
      }
    }

    this.setState({
      appState: nextAppState
    });
  }

  requestConfiguration() {
    WebSocketCommunication.sendMessage({code: this._configuration_code});
  }

  configurationReceived() {
    const { setConnectionStatus } = this.props;

    if (this._configuration_interval) {
      clearInterval(this._configuration_interval);
    }

    /* update connection status */
    setConnectionStatus(2);
  }

  setupWebSocketCommunication() {
    const { setConnectionStatus } = this.props;

    /* request {code: 0} once connected */
    WebSocketCommunication.setOnConnected(() => {
      console.log('WebSocket connected');

      ConfigManager.onMiddlewareUpdate(dummy_config);

      /* request configuration on connect - and request every 5 seconds until
         received */
      this.requestConfiguration();
      this._configuration_interval =
        setInterval(this.requestConfiguration.bind(this), 5000);

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
      WebSocketCommunication.disconnect();
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
