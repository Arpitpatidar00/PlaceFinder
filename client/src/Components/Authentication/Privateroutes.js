// src/Components/Authentication/Privateroutes.js
import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';  // Ensure the correct import

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const userToken = localStorage.getItem("token"); 
  const userData = localStorage.getItem("userData"); 
 


  
  const adminToken = localStorage.getItem("adminToken");  

  let isAuthenticated = false;
  let userRole = null;

  // Check if user token exists and decode it
  if (userToken) {
    try {
      const decodedToken = jwtDecode(userToken);
      // Check expiration
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp > currentTime) {
        isAuthenticated = true;
        userRole = decodedToken.role;
            }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");  // Optionally, remove the invalid token
      localStorage.removeItem("userData"); // Clear user data as well
    }
  }

  // Check if admin token exists and decode it
  if (adminToken) {
    try {
      const decodedAdminToken = jwtDecode(adminToken);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedAdminToken.exp > currentTime) {
        isAuthenticated = true;
        userRole = 'admin'; // Set role to admin
      }
    } catch (error) {
      console.error("Invalid admin token:", error);
      localStorage.removeItem("adminToken");  // Optionally, remove the invalid admin token
    }
  }

  // Check role if requiredRole is defined
  const hasRequiredRole = !requiredRole || userRole === requiredRole;

  // Check if user is authenticated and has required role
  return isAuthenticated && userData && hasRequiredRole ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
