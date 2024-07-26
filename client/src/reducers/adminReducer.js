// authActions.js

// Action Types
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

// Action Creators
export const signUp = (userData) => {
  return {
    type: SIGN_UP,
    payload: userData
  };
};

export const logIn = (userData) => {
  return {
    type: LOG_IN,
    payload: userData
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};
