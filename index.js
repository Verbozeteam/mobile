/* @flow */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import VerbozeMobile from './VerbozeMobile';

/**
 * Create the Redux store and wrap the application in a Redux context
 */

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ConfigurationReducer from './reducers/ConfigurationReducer';

type PropsType = {};
type StateType = {};

const STORE = createStore(
  combineReducers({
    configuration: ConfigurationReducer
  })
);

class VerbozeMobileRedux extends Component<PropsType, StateType> {
  render() {
    return (
      <Provider store={STORE}>
        <VerbozeMobile />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('VerbozeMobile', () => VerbozeMobileRedux);
