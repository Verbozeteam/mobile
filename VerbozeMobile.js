/* @flow */

import React, { Component } from 'react';
import { StatusBar, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainNavigator from './navigation/MainNavigator';
import FirstConfigureStack from './navigation/FirstConfigureStack';

type PropsType = {};

type StateType = {
  users_name: string,
  configuration_token: '',
};

export default class VerbozeMobile extends Component<PropsType, StateType> {

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
      AsyncStorage.clear();
    }

    /* get user's name and configuration token */
    this.getUsersName();
    this.getConfigurationToken();
  }

  async getUsersName() {
    /* get user's name from AsyncStorage and set to state if exists */
    try {
      const users_name = await AsyncStorage.getItem('users_name');
      if (users_name !== null) {
        this.setState({
          users_name
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getConfigurationToken() {
    /* get configuration token from AsyncStorage and set to state if exist */
    try {
      const token = await AsyncStorage.getItem('configuration_token');
      if (token !== null) {
        this.setState({
          configuration_token: token
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  configurationCompleted(users_name: string, configuration_token: string) {
    this.setState({
      users_name,
      configuration_token
    });
  }

  checkConfigurationCompleted(): boolean {
    const { users_name, configuration_token } = this.state;

    if (users_name && typeof users_name == 'string' &&
      configuration_token && typeof configuration_token == 'string') {

      return true;
    }
    return false;
  }

  render() {
    const { users_name, configuration_token } = this.state;

    console.log(users_name, configuration_token);
    console.log(this.checkConfigurationCompleted())

    return <FirstConfigureStack />

    // if (users_name) {
    //   return <MainNavigator />
    // } else {
    //   return <FirstConfigureStack />
    // }
  }
}
