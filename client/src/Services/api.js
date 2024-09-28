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
export const signInUser = async (loginData) => {
  let response = null;
  try {
    response = await axios.post(`${Api}/auth/signin`, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the response to verify user data and token
    console.log('Response from server:', response.data);
    
    // Dispatch login success action with user data and token
    return response.data; // Return the server response
  } catch (error) {
    console.error('Signin Error:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error after logging
  } finally {
    if (response) {
      console.log('Final Response:', response.data); // Log response only if it's available
    } else {
      console.log('No response received.');
    }
  }
};



export const adminService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${Api}/api/admin/login`, {
        email,
        password,
      });
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error("Error logging in: " + error.response.data.message);
    }
  },
};