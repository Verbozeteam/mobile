/* @flow */

export const SET_USERS_NAME = 'SET_USERS_NAME';
export const SET_WEBSOCKET_ADDRESS = 'SET_WEBSOCKET_ADDRESS';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';
export const RESET_CONFIGURATION = 'RESET_CONFIGURATION';

/* set user's name */
export function setUsersName(users_name: string) {
  return {
    type: SET_USERS_NAME,
    users_name
  };
};

/* set configuration token */
export function setWebSocketAddress(websocket_address: string) {
  return {
    type: SET_WEBSOCKET_ADDRESS,
    websocket_address
  };
};

/* set connection status */
export function setConnectionStatus(connection_status: 0 | 1 | 2) {
  return {
    type: SET_CONNECTION_STATUS,
    connection_status
  };
};

/* reset configuration */
export function resetConfiguration() {
  return {
    type: RESET_CONFIGURATION
  };
};
