import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import "./Navbar.css";
import { useAuth } from "../../Context/AuthContext";
import { showAlert } from '../Loader/Alert.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsLogin, isMobile, setIsMobile } = useAuth();

  useEffect(() => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    const confirmed = await showAlert("Are you sure you want to log out?");

    if (confirmed) {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/");
    }
};


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const navigateTo = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const isAdmin = userData?.role === "admin";
  const profileImageSrc =
    userData?.profileImage || "/path/to/default-avatar.png"; // Add a default avatar image

  return (
    <nav>
      <div className="nav">
        <button className="navbtn" onClick={() => navigateTo("/")}>
          PlaceFinder
        </button>
        {isMobile && (
          <>
            <input
              type="checkbox"
              id="checkbox"
              checked={isMobileMenuOpen}
              onChange={toggleMobileMenu}
            />
            <label htmlFor="checkbox" className="toggle">
              <div
                className={`bars ${isMobileMenuOpen ? "rotate-bar1" : ""}`}
                id="bar1"
              ></div>
              <div
                className={`bars ${isMobileMenuOpen ? "fade-bar2" : ""}`}
                id="bar2"
              ></div>
              <div
                className={`bars ${isMobileMenuOpen ? "rotate-bar3" : ""}`}
                id="bar3"
              ></div>
            </label>
          </>
        )}
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {!isAdmin && isAuthenticated && (
            <li>
              <button
                className="navbtn-rightside"
                onClick={() => navigateTo("/home")}
              >
                Home
              </button>
            </li>
          )}
          {isAdmin && (
            <li>
              <button className="navbtn" onClick={() => navigateTo("/admin")}>
                Admin
              </button>
            </li>
          )}

          {isAuthenticated && (
            <li className="profile-menu" onClick={toggleProfileMenu}>
              <img
                className="rounded-circle shadow-1-strong me-3"
                src={profileImageSrc}
                alt="avatar"
                width="50"
                height="50"
              />
              {isProfileMenuOpen && (
                <ul className="profile-dropdown">
                 
                    <button
                      className="navbtn"
                      onClick={() => navigateTo("/profile")}
                    >
                      View Profile
                    </button>
                 
                 
                    <button className="navbtn" onClick={handleLogout}>
                      Logout <LogoutIcon />
                    </button>
                  
                </ul>
              )}
            </li>
          )}
          {!isAuthenticated && !isMobile && (
            <>
              <li>
                <button
                  className="navbtn"
                  onClick={() => {
                    setIsLogin(false);
                    navigateTo("/login");
                  }}
                >
                  Login
                </button>
              </li>
            </>
          )}
          {isMobile && !isAuthenticated && (
            <>
              <li>
                <button
                  className="navbtn"
                  onClick={() => {
                    setIsLogin(false);
                    navigateTo("/login");
                  }}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="navbtn"
                  onClick={() => {
                    setIsLogin(true);
                    navigateTo("/login");
                  }}
                >
                  Signup
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
