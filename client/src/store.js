// store.js
import { createStore, combineReducers } from "redux";
import userDataReducer from "./reducers/userDataReducer";
import placeReducer from "./reducers/placeReducer";
import authReducer from "./reducers/authReducer"; // Import authReducer

// Combine all reducers
const rootReducer = combineReducers({
  userData: userDataReducer,
  auth: authReducer,

  place: placeReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
