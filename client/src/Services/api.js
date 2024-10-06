import axios from "axios";
import Api from "../Api";
import { toast } from "react-toastify"; // Import toast from react-toastify

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${Api}/auth/signup`, userData);
    return response.data; // Return the server response
  } catch (error) {
    console.error("Signup Error:", error.response || error.message); // Improved error logging
    toast.error(error.response?.data?.message || "Signup failed!"); // Show error toast
    throw error; // Handle errors
  }
};

export const signInUser = async (loginData) => {
  let response = null;
  try {
    response = await axios.post(`${Api}/auth/signin`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Log the response to verify user data and token

    // Dispatch login success action with user data and token
    return response.data; // Return the server response
  } catch (error) {
    console.error(
      "Signin Error:",
      error.response ? error.response.data : error.message
    );
    toast.error(error.response?.data?.message || "Signin failed!"); // Show error toast
    throw error; // Re-throw the error after logging
  }
};

export const adminService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${Api}/api/admin/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed!"); // Show error toast
      throw new Error("Error logging in: " + error.response?.data?.message); // Use optional chaining for safer access
    }
  },
};
