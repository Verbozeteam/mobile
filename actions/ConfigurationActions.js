/* @flow */

export const SET_USERS_NAME = 'SET_USERS_NAME';
export const SET_CONFIGURATION_TOKEN = 'SET_CONFIGURATION_TOKEN';

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
