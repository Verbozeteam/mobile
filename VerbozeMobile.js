/* @flow */

import React, { Component } from 'react';
import { StatusBar, AsyncStorage, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import { ConfigManager } from './js-api-utils/ConfigManager';
import { WebSocketCommunication } from './js-api-utils/WebSocketCommunication';
import { setUsersName, setConfigurationToken } from './actions/ConfigurationActions';

import MainNavigator from './navigation/MainNavigator';
import FirstConfigureStack from './navigation/FirstConfigureStack';

import { dummy_config } from './dummy_config';

type PropsType = {
  users_name: string,
  configuration_token: string,

  setUsersName: (users_name: string) => null,
  setConfigurationToken: (configuration_token: string) => null
};

type StateType = {};

const mapStateToProps = (state: Object) => {
  return {
    users_name: state.configuration.users_name,
    configuration_token: state.configuration.configuration_token
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setUsersName: (users_name: string) =>
      dispatch(setUsersName(users_name)),

    setConfigurationToken: (users_name: string) =>
      dispatch(setConfigurationToken(users_name))
  };
};

class VerbozeMobile extends Component<PropsType, StateType> {

  _ws_url: string = 'wss://www.verboze.com/stream/35b4d595ef074543a2fa686650024d98';

  componentWillMount() {
    /* set status bar color to light */
    Platform.OS === 'ios' ? StatusBar.setBarStyle('light-content', true) : StatusBar.setBackgroundColor('#1E1E1E');

    /* clear all AsyncStorage for development purposes */
    if (__DEV__) {
      // AsyncStorage.clear();
      const { setConfigurationToken } = this.props;
      setConfigurationToken('123456789-987654321');
    }

    /* get user's name and configuration token */
    this.getUsersName();
    this.getConfigurationToken();
  }

  componentDidMount() {
    /* create websocket connection */
    WebSocketCommunication.setOnMessage(ConfigManager.onMiddlewareUpdate);
    WebSocketCommunication.connect(this._ws_url);


    // TODO: get config from websocket instead
    ConfigManager.onMiddlewareUpdate(dummy_config);
  }

  fetchConfiguration() {

  }

  async getUsersName() {
    const { setUsersName } = this.props;

    /* get user's name from AsyncStorage and set to state if exists */
    try {
      const users_name = await AsyncStorage.getItem('users_name');
      if (users_name !== null) {
        setUsersName(users_name);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getConfigurationToken() {
    const { setConfigurationToken } = this.props;

    /* get configuration token from AsyncStorage and set to state if exist */
    try {
      const token = await AsyncStorage.getItem('configuration_token');
      if (token !== null) {
        setConfigurationToken(token);
      }
    } catch (err) {
      console.error(err);
    }
  }

  checkConfigurationCompleted(): boolean {
    const { users_name, configuration_token } = this.props;

    if (users_name && typeof users_name == 'string' &&
      configuration_token && typeof configuration_token == 'string') {

      return true;
    }
    return false;
  }

  render() {
    const configuration_completed = this.checkConfigurationCompleted();

    if (configuration_completed) {
      return <MainNavigator />;
    } else {
      return <FirstConfigureStack />;
    }
  }
}

VerbozeMobile = connect(mapStateToProps, mapDispatchToProps) (VerbozeMobile);
export default VerbozeMobile;
