import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      alert("Login successful!");
      console.log(response.data);
      // Redirect to the admin page after successful login
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login. Please try again.");
    }
  };

  return (
    <div id="centre">
      <div className="mycard">
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
            <Link to="/">Don't have an account?</Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
