import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Ensure the correct import

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const token = localStorage.getItem("accessToken");

  let isAuthenticated = false;
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp > currentTime) {
        isAuthenticated = true;
        userRole = decodedToken.role;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("accessToken");
    }
  }

  // Check if requiredRole matches the user's role or if no role is required
  const hasRequiredRole = !requiredRole || userRole === requiredRole;

  // If authenticated and has the required role, render the component; otherwise, redirect to login
  return isAuthenticated && hasRequiredRole ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

// Non-protected routes (login, signup)
export const NotPrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("accessToken");

  return token ? <Navigate to="/home" /> : <Component {...rest} />;
};

export default PrivateRoute;
