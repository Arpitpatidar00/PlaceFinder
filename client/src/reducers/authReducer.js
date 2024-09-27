
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

const authReducer = (state = { ...initialState, user: savedUserData, accessToken: savedAccessToken }, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.userData,
                accessToken: action.payload.accessToken,
                isAuthenticated: true,
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
