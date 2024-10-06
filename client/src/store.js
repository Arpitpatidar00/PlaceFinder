import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'; // Correct import for thunk
import userDataReducer from "./reducers/userDataReducer";
import placeReducer from "./reducers/placeReducer";
import authReducer from "./reducers/authReducer";

// Combine all reducers
const rootReducer = combineReducers({
  userData: userDataReducer,
  auth: authReducer,
  place: placeReducer,
});

// Create the Redux store with thunk middleware and Redux DevTools
const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;
