// Adminlogin.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { loginSuccess } from "../actions/authActions";
import './admin.css';

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/admin/login", { email, password });
      const { token, data } = response.data;

      // Dispatch logIn action and store in localStorage
      dispatch(loginSuccess(data, token));

      alert("Login successful!");
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="card auth-card">
          <h2 className="title">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn waves-effect waves-light #64b5f6 blue lighten-2"
              type="submit"
              name="action"
            >
              LOGIN
            </button>
          </form>
          <h6>
            <Link to="/admin-registration">Don't have an account?</Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
