/* @flow */

if (!__DEV__) {
  console.log = () => {};
}

import React, { Component } from 'react';
import { AppState, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Sentry } from 'react-native-sentry';

import LocalStorage from './js-api-utils/LocalStorage';
import { ConfigManager } from './js-api-utils/ConfigManager';
import { WebSocketCommunication } from './js-api-utils/WebSocketCommunication';
import { setUsersName, setWebSocketAddress, setConnectionStatus }
  from './actions/ConfigurationActions';

import { Colors } from './constants/styles';

import LaunchScreenView from './views/LaunchScreenView';
import MainNavigator from './navigation/MainNavigator';
import FirstConfigureStack from './navigation/FirstConfigureStack';

type PropsType = {
  users_name: string,
  websocket_address: string,
  connection_status: 0 | 1 | 2,

  setUsersName: (users_name: string) => void,
  setWebSocketAddress: (websocket_address: string) => void,
  setConnectionStatus: (connection_status: 0 | 1 | 2) => void
};

type StateType = {
  app_state: string,

  loading_status: {
    [string]: boolean
  }
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
    app_state: AppState.currentState || '',
    loading_status: {
      users_name: false,
      websocket_address: false,
      cached_configuration: false
    }
  };

  _unsubscribe: () => boolean = () => false;

  /* code sent over WebSocket to receive configuration */
  _configuration_code: number = 0;

  /* interval for resending configuration code */
  _configuration_resend_interval: IntervalID;

  componentWillMount() {
    const { setUsersName, setWebSocketAddress } = this.props;

    /* setup Sentry error logging */
    if (!__DEV__) {
      Sentry.config('https://6c4fe995e1ff4d2aa3dd8455917e7528:78d81847be544d92adfd6082c5b148bf@sentry.verboze.com/2').install();
    }

    this._unsubscribe =
      ConfigManager.registerConfigChangeCallback((config) => {
        LocalStorage.store(LocalStorage.keys.cached_configuration,
          JSON.stringify(config), this.forceUpdate.bind(this));
      });

    if (__DEV__) {
      // LocalStorage.reset();
    }

    /* set status bar color to light */
    Platform.OS === 'ios' ?
      StatusBar.setBarStyle('light-content', true) :
      StatusBar.setBackgroundColor(Colors.blackish);

    /* set up ConfigManager */
    ConfigManager.initialize(WebSocketCommunication);
    ConfigManager.setOnConfigReceived(this.configurationReceived.bind(this));

    /* setup WebSocket communication callbacks */
    this.setupWebSocketCommunication();

    /* get user's name, WebSocket address and cached configuration */
    LocalStorage.get(LocalStorage.keys.users_name, setUsersName,
      () => {}, () => this.updateLoading('users_name'));

    LocalStorage.get(LocalStorage.keys.websocket_address, setWebSocketAddress,
      () => {}, () => this.updateLoading('websocket_address'));

    LocalStorage.get(LocalStorage.keys.cached_configuration, (config) => {
      ConfigManager.setConfig(JSON.parse(config));
      this.forceUpdate();
    }, () => {}, () => this.updateLoading('cached_configuration'));
  }

  componentDidMount() {
    console.log('VerbozeMobile mounted');
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  componentWillReceiveProps(nextProps: PropsType) {
    console.log('componentWillReceiveProps', nextProps);
    const { websocket_address } = this.props;

    /* check if WebSocket address changed */
    if (nextProps.websocket_address &&
      nextProps.websocket_address !== websocket_address) {
      this.connectWebSocket(nextProps.websocket_address);
    }
  }

  componentWillUnmount() {
    console.log('VerbozeMobile will unmount');
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
    this._unsubscribe();
  }

  handleAppStateChange(nextAppState: string) {
    console.log('handleAppStateChange', nextAppState);
    const { connection_status, websocket_address } = this.props;
    const { app_state } = this.state;

    /* check if app moved from inactive or background to foreground */
    if (app_state && app_state.match(/inactive|background/) &&
      nextAppState === 'active') {

      /* if WebSocket not connected, connect immediately */
      if (connection_status < 1 && websocket_address) {
        this.connectWebSocket(websocket_address);
      }
    }

    this.setState({
      app_state: nextAppState
    });
  }

  updateLoading(key: string) {
    console.log('updateLoading', key);
    const { loading_status } = this.state;

    loading_status[key] = true;

    this.setState({
      loading_status
    });
  }

  requestConfiguration() {
    console.log('requestConfiguration');
    /* send request configuration message */
    WebSocketCommunication.sendMessage({code: this._configuration_code});
  }

  configurationReceived() {
    console.log('configurationReceived');
    const { setConnectionStatus } = this.props;

    /* remove configuration request resend interval */
    if (this._configuration_resend_interval) {
      clearInterval(this._configuration_resend_interval);
    }

    /* update connection status */
    setConnectionStatus(2);
  }

  setupWebSocketCommunication() {
    console.log('setupWebSocketCommunication');
    const { setConnectionStatus } = this.props;

    /* request configuration once connected */
    WebSocketCommunication.setOnConnected(() => {
      console.log('WebSocket connected');

      /* request configuration on connect - request every 5 seconds until
         received */
      if (this._configuration_resend_interval) {
        clearInterval(this._configuration_resend_interval);
      }
      this._configuration_resend_interval =
        setInterval(this.requestConfiguration.bind(this), 5000);
      this.requestConfiguration();

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
    console.log('connectWebSocket', address);
    const { setConnectionStatus } = this.props;

    setConnectionStatus(1);

    try {
      WebSocketCommunication.reset();
      WebSocketCommunication.connect(address);
    }

    catch (err) {
      console.log(err);
    }
  }

  checkConfigurationCompleted(): boolean {
    console.log('checkConfigurationCompleted');
    const { users_name, websocket_address } = this.props;

    if (users_name && typeof users_name == 'string' &&
      websocket_address && typeof websocket_address == 'string') {

      return true;
    }

    return false;
  }

  checkLoadingCompleted(): boolean {
    console.log('checkLoadingCompleted');
    const { loading_status } = this.state;

    return Object.values(loading_status).reduce(
      (acc: boolean, curr: boolean) => acc && curr, true);
  }

  render() {
    const configuration_completed = this.checkConfigurationCompleted();
    const loading_completed = this.checkLoadingCompleted();

    if (!loading_completed) {
      return <LaunchScreenView />;
    }

    if (configuration_completed && ConfigManager.hasConfig) {
      return <MainNavigator />;
    } else {
      return <FirstConfigureStack />;
    }
  }
}

VerbozeMobile = connect(mapStateToProps, mapDispatchToProps) (VerbozeMobile);
export default VerbozeMobile;
