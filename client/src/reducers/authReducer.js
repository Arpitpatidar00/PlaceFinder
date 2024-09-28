import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions';

// Define the initial state
const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
};

// Function to safely parse data from local storage
const parseLocalStorageData = (key, fallback) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (error) {
        console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
        return fallback; // Return fallback in case of error
    }
};

// Get the initial state from local storage if available
const savedUserData = parseLocalStorageData('userData', initialState.user);
const savedAccessToken = localStorage.getItem('accessToken') || null;

// Determine if the user is authenticated based on local storage
const isAuthenticated = savedUserData && savedAccessToken ? true : false;

// Create the initial state with the authentication status
const authReducer = (state = { ...initialState, user: savedUserData, accessToken: savedAccessToken, isAuthenticated }, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.userData, // Set user data from the payload
                accessToken: action.payload.accessToken, // Set token from the payload
                isAuthenticated: true, // Mark the user as authenticated
            };
        case LOGOUT:
            // Clear localStorage on logout
            localStorage.removeItem('userData');
            localStorage.removeItem('accessToken');
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default authReducer;
