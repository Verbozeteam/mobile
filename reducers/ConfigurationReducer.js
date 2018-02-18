/* @flow */

import {
  SET_USERS_NAME,
  SET_CONFIGURATION_TOKEN,
  SET_CONNECTION_STATUS
} from '../actions/ConfigurationActions';

type StateType = {
  users_name: string,
  configuration_token: string
};

const defaultState: StateType = {
  users_name: '',
  configuration_token: ''
};

const reducer = (state: StateType = defaultState, action: Object) => {
  var new_state: StateType = {...state};

  switch(action.type) {
    /* set user's name */
    case SET_USERS_NAME:
      new_state.users_name = action.users_name;
      break;

    /* set configuration token */
    case SET_CONFIGURATION_TOKEN:
      new_state.configuration_token = action.configuration_token;
      break;
  }

  return new_state;
}

module.exports = reducer;
