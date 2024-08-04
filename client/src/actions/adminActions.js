// adminActions.js
import axios from 'axios';

// Action Types
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

// Action Creators
export const logIn = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", userData);
    const { token, data } = response.data;
    localStorage.setItem('accessToken', token);

    dispatch({
      type: LOG_IN,
      payload: { token, user: data }
    });
    alert("Login successful!");
    window.location.href = "/admin";
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Failed to login. Please try again.");
  }
};

export const logOut = () => {
  localStorage.removeItem('accessToken');
  return {
    type: LOG_OUT
  };
};
