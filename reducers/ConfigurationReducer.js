/* @flow */

import {
  SET_USERS_NAME,
  SET_WEBSOCKET_ADDRESS,
  SET_CONNECTION_STATUS,
  RESET_CONFIGURATION
} from '../actions/ConfigurationActions';

type StateType = {
  users_name: string,
  websocket_address: string
};

const defaultState: StateType = {
  users_name: '',
  websocket_address: ''
};

const reducer = (state: StateType = defaultState, action: Object) => {
  var new_state: StateType = {...state};

  switch(action.type) {
    /* set user's name */
    case SET_USERS_NAME:
      new_state.users_name = action.users_name;
      break;

    /* set configuration token */
    case SET_WEBSOCKET_ADDRESS:
      new_state.websocket_address = action.websocket_address;
      break;

    /* reset configuration */
    case RESET_CONFIGURATION:
      new_state = {...defaultState}
  }

  return new_state;
}

module.exports = reducer;
