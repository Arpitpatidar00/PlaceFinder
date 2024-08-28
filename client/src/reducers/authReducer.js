// authReducer.js
import { LOGIN_SUCCESS, LOGOUT } from "../actions/authActions";
import Cookies from "js-cookie";

// Load user data from localStorage
const userDataFromStorage = localStorage.getItem("userData");
const accessTokenFromStorage = localStorage.getItem("accessToken");

const initialState = {
  userData: userDataFromStorage ? JSON.parse(userDataFromStorage) : null,
  accessToken: accessTokenFromStorage || null,
  isLoggedIn: !!userDataFromStorage,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Save user data and access token to localStorage
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      localStorage.setItem("accessToken", action.payload.accessToken);
      return {
        ...state,
        userData: action.payload.userData,
        accessToken: action.payload.accessToken,
        isLoggedIn: true,
      };
    case LOGOUT:
      // Clear user data from localStorage and cookies
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      Cookies.remove("accessToken"); // Use remove method instead of removeItem
      return {
        ...state,
        userData: null,
        accessToken: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;