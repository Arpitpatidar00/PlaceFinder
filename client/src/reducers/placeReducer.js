
import { SET_PLACE_ID } from "../actions/placeActions.js";

// Load place ID from localStorage
const placeIdFromStorage = localStorage.getItem("placeId");

const initialState = {
  placeId: placeIdFromStorage || null,
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACE_ID:
      // Save place ID to localStorage
      localStorage.setItem("placeId", action.payload);
      return {
        ...state,
        placeId: action.payload,
      };
    default:
      return state;
  }
};

export default placeReducer;
