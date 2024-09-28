// actions/authActions.js

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SET_SEARCH_DATA = "SET_SEARCH_DATA";
export const SIGN_UP = "SIGN_UP";

export const loginSuccess = (userData, accessToken) => {
  // Store the data in localStorage
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("accessToken", accessToken);

  return {
    type: LOGIN_SUCCESS,
    payload: { userData, accessToken },
  };
};

export const logout = () => {
  // Remove the data from localStorage on logout
  localStorage.removeItem("userData");
  localStorage.removeItem("accessToken");

  return {
    type: LOGOUT,
  };
};

export const setSearchData = (searchData) => ({
  type: SET_SEARCH_DATA,
  payload: searchData,
});

export const signUp = (userData) => ({
  type: SIGN_UP,
  payload: userData,
});
