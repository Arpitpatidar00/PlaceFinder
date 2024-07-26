// userDataReducer.js
const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const SET_USER_DATA = "SET_USER_DATA";
const CLEAR_USER_DATA = "CLEAR_USER_DATA";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        userData: null,
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export default userDataReducer;
