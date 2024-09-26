import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { VscChromeClose } from "react-icons/vsc"; // Close icon
import { CiMenuFries } from "react-icons/ci"; // Menu icon
import "./Navbar.css";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const { setIsLogin, isMobile, setIsMobile } = useAuth(); // Adjusted to match correct context usage

  // Close menus on route change
  useEffect(() => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 && window.innerWidth > 360);
    };

    handleResize(); // Check the size on initial load
    window.addEventListener("resize", handleResize); // Attach resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener on unmount
    };
  }, []);
  // Toggle profile menu visibility
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Navigate to specified path
  const navigateTo = (path) => {
    navigate(path);
  };

  // Redirect to login
  function redirectToLogin() {
    setIsLogin(false); // Activate login mode
    navigateTo("/login");
  }
  function redirectToSignup() {
    setIsLogin(true); // Activate login mode
    navigateTo("/login");
  }
  function redirectToLoginNew() {
    navigateTo("/login");
  }
  const isAdmin = userData?.role === "admin";

  return (
    <nav>
      <div className="nav">
        <button className="navbtn" onClick={() => navigateTo("/")}>
          PlaceFinder
        </button>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <VscChromeClose size={24} className="menu-icon" />
          ) : (
            <CiMenuFries size={24} className="menu-icon" />
          )}
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <>
              {!isAdmin && (
                <li>
                  <button onClick={() => navigateTo("/home")}>Home</button>
                </li>
              )}
              <li className="profile-menu" onClick={toggleProfileMenu}>
                <img
                  src={`data:image/png;base64,${userData.image}`}
                  alt="User Profile"
                  className="user-image"
                />
                {isProfileMenuOpen && (
                  <ul className="profile-dropdown">
                    <li>
                      <button
                        id="profile"
                        onClick={() => navigateTo("/profile")}
                      >
                        View Profile
                      </button>
                    </li>
                    <li>
                      <button id="logout-btn" onClick={handleLogout}>
                        Logout <LogoutIcon />
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              {!isAdmin && !isMobile && (
                <li>
                  <button className="home-btn"  onClick={redirectToLoginNew}>
                    Login
                  </button>
                </li>
              )}

              {!isAdmin && isMobile && (
                <>
                  <li>
                    <button className="home-btn" onClick={redirectToLogin}>
                      Login
                    </button>
                  </li>
                  <li>
                    <button className="home-btn" onClick={redirectToSignup}>
                      Signup
                    </button>
                  </li>
                </>
              )}
              {isAdmin && (
                <li>
                  <button
                    className="home-btn"
                    onClick={() => navigateTo("/admin")}
                  >
                    Admin
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
