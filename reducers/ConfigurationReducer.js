/* @flow */

import {
  SET_USERS_NAME,
  SET_WEBSOCKET_ADDRESS,
  SET_CONNECTION_STATUS,
  RESET_CONFIGURATION,
  SET_ROOM_CARD_IN,
  SET_ROOM_TEMPERATURE,
} from '../actions/ConfigurationActions';

type StateType = {
  users_name: string,
  websocket_address: string,
  connection_status: 0 | 1 | 2,
  roomStatus: any,
};

const defaultState: StateType = {
  users_name: '',
  websocket_address: '',
  connection_status: 0,
  roomStatus: {},
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

    /* set connection status */
    case SET_CONNECTION_STATUS:
      new_state.connection_status = action.connection_status;
      break;

    /* reset configuration */
    case RESET_CONFIGURATION:
      new_state = {...defaultState}
      break;

    case SET_ROOM_CARD_IN:
      if (new_state.roomStatus.cardIn === action.isIn)
          return state;
          new_state.roomStatus.cardIn = action.isIn;
      break;
    case SET_ROOM_TEMPERATURE:
      if (new_state.roomStatus.temperature === action.temperature)
          return state;
        new_state.roomStatus.temperature = action.temperature;
      break;
  }

  return new_state;
}

module.exports = reducer;
