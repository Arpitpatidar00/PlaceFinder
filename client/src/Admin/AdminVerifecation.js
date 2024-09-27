
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Api from "../Api";
import Loader from "../Components/Loader/Loader";

const AdminMiddleware = ({ children }) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for token issues
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Extract token from query string (e.g., ?token=your_token_here)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        // Check if token exists and is in valid format
        if (!token || token.length < 20) {
          setError("Invalid token format.");
          navigate("/login"); // Redirect to login if token is invalid or missing
          return;
        }

        // Verify the token by making an API call to the backend
        const response = await axios.get(`${Api}/api/admin/verify-token/${token}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });

        const { verified, role, expired } = response.data;

        // Store user role in localStorage
        localStorage.setItem("userRole", role);

        if (verified) {
          if (role === "admin") {
            localStorage.setItem("admindata", JSON.stringify(response.data));
            // Allow rendering of children (AdminLogin) since the token is valid
          } else {
            setError("You are not authorized.");
            navigate("/login"); // Redirect if not an admin
          }
        } else if (expired) {
          setError("Token expired. Please login again.");
          navigate("/login"); // Redirect if token is expired
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setError("Token verification failed. Please try again.");
        navigate("/login"); // Redirect on error
      } finally {
        setLoading(false); // Stop loading once the verification is complete
      }
    };

    verifyToken(); // Call the verification function when the component loads
  }, [navigate]);

  // Display loading message while verifying token
  if (loading) {
    return <Loader />;
  }

  // Display error message if any error occurs
  if (error) {
    return <div>{error}</div>;
  }

  return <>{children}</>; // Render children (AdminLogin) if no issues
};

export default AdminMiddleware;
