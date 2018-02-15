/* @flow */

import React, { Component } from 'react';
import { StatusBar, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUsersName, setConfigurationToken } from './actions/ConfigurationActions';

import MainNavigator from './navigation/MainNavigator';
import FirstConfigureStack from './navigation/FirstConfigureStack';

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

  static defaultProps = {

  };

  state = {
    users_name: '',
    configuration_token: '',
  }

  componentWillMount() {
    /* set status bar color to light */
    StatusBar.setBarStyle('light-content', true);

    /* clear all AsyncStorage for development purposes */
    if (__DEV__) {
      // AsyncStorage.clear();
    }

    /* get user's name and configuration token */
    this.getUsersName();
    this.getConfigurationToken();
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
    console.log("user's name", users_name, 'configuration token', configuration_token);

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
