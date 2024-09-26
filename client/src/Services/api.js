import axios from 'axios';
import Api from '../Api';

// Define the base URL of your backend API


export const signUp = async (userData) => {
  console.log("Sending User Data:", userData);
  try {
    const response = await axios.post(`${Api}/auth/signup`, userData);
    return response.data;  // Return the server response
  } catch (error) {
    console.error('Signup Error:', error.response || error.message); // Improved error logging
    throw error;  // Handle errors
  }
};



// Signin API Call
export const signInUser = async (loginData) => {
  try {
    const response = await axios.post(`${Api}/auth/signin`, loginData, {
      headers: {
        'Content-Type': 'application/json',  // Ensure the Content-Type is set to JSON
      },
    });
    return response.data;  // Return the server response (possibly containing a token)
  } catch (error) {
    console.error('Signin Error:', error.response ? error.response.data : error.message);
    throw error;  // Handle errors
  }
};

