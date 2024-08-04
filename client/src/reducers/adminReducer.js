// adminReducer.js
import { LOG_IN, LOG_OUT } from '../actions/adminActions';

const initialState = {
  token: localStorage.getItem('accessToken') || null,
  user: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOG_OUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default adminReducer;
