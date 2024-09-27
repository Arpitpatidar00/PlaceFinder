import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {adminService} from "../Services/api.js"; // Import the admin service
import { loginSuccess } from "../actions/authActions.js";
import "./admin.css";
import Cookies from "js-cookie";
import Loader from '../Components/Loader/Loader.js';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, user } = await adminService.login(email, password);
      
      // Set token in cookies with secure options
      Cookies.set("accessToken", token, { expires: 7, secure: true, sameSite: 'Strict' });
      
      // Dispatch login success
      dispatch(loginSuccess(user, token));
      
      alert("Login successful!");
     navigate('/adminhome')
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          <div className="Admin-container">
            <div className="login-container">
              <h2 className="title">Admin Login</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                  className={error ? "input-error" : ""}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-label="Password"
                  className={error ? "input-error" : ""}
                />
                <button className="login-btn" type="submit" name="action">
                  LOGIN
                </button>
              </form>
              <h6 className="registration-link">
                <Link to="/admin-registration">Don't have an account?</Link>
              </h6>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
