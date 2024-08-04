// // store.js
// import { createStore, combineReducers } from "redux";
// import userDataReducer from "./reducers/userDataReducer";
// import placeReducer from "./reducers/placeReducer";
// import authReducer from "./reducers/authReducer"; // Import authReducer
// import adminReducer from './reducers/adminReducer'

// // Combine all reducers
// const rootReducer = combineReducers({
//   userData: userDataReducer,
//   auth: authReducer,
//   admin: adminReducer,

//   place: placeReducer,
// });

// // Create the Redux store
// const store = createStore(rootReducer);

// export default store;
// store.js
// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'; // Import thunk as a named import
import userDataReducer from "./reducers/userDataReducer";
import placeReducer from "./reducers/placeReducer";
import authReducer from "./reducers/authReducer";
import adminReducer from './reducers/adminReducer';

// Combine all reducers
const rootReducer = combineReducers({
  userData: userDataReducer,
  auth: authReducer,
  admin: adminReducer,
  place: placeReducer,
});

// Create the Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

