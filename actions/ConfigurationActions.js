/* @flow */

export const SET_USERS_NAME = 'SET_USERS_NAME';
export const SET_CONFIGURATION_TOKEN = 'SET_CONFIGURATION_TOKEN';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';

/* set user's name */
export function setUsersName(users_name: string) {
  return {
    type: SET_USERS_NAME,
    users_name
  };
};

/* set configuration token */
export function setConfigurationToken(configuration_token: string) {
  return {
    type: SET_CONFIGURATION_TOKEN,
    configuration_token
  };
};

/* set connection status */
export function setConnectionStatus(connection_status: 0 | 1 | 2) {
  return {
    type: SET_CONNECTION_STATUS,
    connection_status
  };
};
