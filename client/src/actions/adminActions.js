import Cookies from 'js-cookie';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (userData, accessToken) => ({
  type: LOGIN_SUCCESS,
  payload: { userData, accessToken },
});

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userData");
  Cookies.remove("accessToken");
  return {
    type: LOGOUT,
  };
};
