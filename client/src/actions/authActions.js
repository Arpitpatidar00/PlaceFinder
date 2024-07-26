// authActions.js
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SET_SEARCH_DATA = "SET_SEARCH_DATA";
export const SIGN_UP = "SIGN_UP";

export const loginSuccess = (userData, accessToken) => ({
  type: LOGIN_SUCCESS,
  payload: { userData, accessToken },
});

export const logout = () => ({
  type: LOGOUT,
});

export const setSearchData = (searchData) => ({
  type: SET_SEARCH_DATA,
  payload: searchData,
});

export const signUp = (userData) => ({
  type: SIGN_UP,
  payload: userData,
});
