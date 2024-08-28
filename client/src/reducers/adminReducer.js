import { LOGIN_SUCCESS, LOGOUT } from "../actions/adminActions.js";
import Cookies from "js-cookie";

// Load user data from localStorage
const userDataFromStorage = localStorage.getItem("userData");
const accessTokenFromCookies = Cookies.get("accessToken");

const initialState = {
  userData: userDataFromStorage ? JSON.parse(userDataFromStorage) : null,
  accessToken: accessTokenFromCookies || null,
  isLoggedIn: !!userDataFromStorage,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Save user data to localStorage and token to cookiex
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      Cookies.set("accessToken", action.payload.accessToken, { expires: 7 });
      return {
        ...state,
        userData: action.payload.userData,
        accessToken: action.payload.accessToken,
        isLoggedIn: true,
      };
    case LOGOUT:
      // Clear user data from localStorage and cookies
      localStorage.removeItem("userData");
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
