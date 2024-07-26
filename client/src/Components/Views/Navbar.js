// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import Feedback from "./Feedback.js"; // Import Feedback component
import "./Profile.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // State for feedback modal

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleFeedbackModal = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  return (
    <>
      <nav style={{ position: "sticky", width: "100%", zIndex: 1000 }}>
        <div className="nav-wrapper white">
          <Link to="/" className="brand-logo left">
            PlaceFinder
          </Link>
          <ul id="nav-mobile" className="right">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button id='feedback-btn'  onClick={toggleFeedbackModal}>Feedback</button> {/* Use a button to open feedback modal */}
                </li>
                <li>
                  <button id="logout-btn" onClick={handleLogout}>
                    <LogoutIcon className="h-1 w-1" />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Feedback isOpen={isFeedbackOpen} toggleModal={toggleFeedbackModal} /> {/* Pass state and function to Feedback component */}
    </>
  );
};

export default Navbar;
