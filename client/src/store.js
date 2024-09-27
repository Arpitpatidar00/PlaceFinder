import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'; // Correct import for thunk
import { composeWithDevTools } from 'redux-devtools-extension'; // Import for dev tools extension
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
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Use composeWithDevTools to integrate Redux DevTools
);

export default store;
