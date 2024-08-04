// Adminlogin.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn } from '../actions/adminActions'; // Adjust the import path as necessary

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn({ email, password }));
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
