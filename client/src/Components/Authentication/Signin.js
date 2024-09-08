// Login.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { loginSuccess } from "../../actions/authActions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Views/Screen.css";
import Api from '../../Api.js';


function Login() {
  const { userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && userData) {
      // Check if the user is an admin and navigate accordingly
      if (userData.role === "admin") {
        navigate("/adminHome");
      } else {
        navigate("/home");
      }
    }
  }, [navigate, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await axios.post(`${Api}/auth/login`, {
        email,
        password,
      });
      toast.success("Login successful!");
      dispatch(loginSuccess(response.data.data, response.data.token));
      if (userData.role==="user"){
          navigate("/home");
              }
      else {
          navigate("/home");
        }
    
     
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to login. Please try again.");
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div id="main">
      <div
        id="container-login"
      
      >
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              id="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              id="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="form-group">
            <button className="btn" type="submit">Log In</button>
          </div>
        </form>
        <div className="link">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
