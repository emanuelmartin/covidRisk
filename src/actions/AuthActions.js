import Parse from 'parse/react-native';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ACTIVE_SESSION,
  NO_SESSION,
  // LOGOUT_USER,
  LOGOUT_USER_SUCCESS
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  const user = new Parse.User();
  user.set('username', email);
  user.set('password', password);
  user.set('email', email);

  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

  user.logIn(email, password)
    .then(user => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    })
    .catch(error => {
      dispatch({ type: LOGIN_USER_FAIL, payload: error });
    });
  };
};

export const session = (user) => {
  if (user) {
    return {
      type: ACTIVE_SESSION,
      payload: user
    };
  }

  return {
    type: NO_SESSION,
    payload: null
  };
};

export const logOut = () => {
  return (dispatch) => {
    //dispatch({ type: LOGOUT_USER });
    Parse.User.logOut()
      .then(dispatch({ type: LOGOUT_USER_SUCCESS }));
  };
};
