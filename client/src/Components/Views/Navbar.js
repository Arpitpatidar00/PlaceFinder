
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const togleProfile = () => {
    navigate("/profile");
  };

  const toggleHome = () => {
    navigate("/home");
  };

  const toggleLogin = () => {
    navigate("/login");
  };

  const toggleSignup = () => {
    navigate("/signup");
  };

  const onMainPage = () => {
    navigate("/");
  };

  const toggleAdmin = () => {
    navigate("/admin");
  };

  const isAdmin = userData?.role === "admin";

  return (
    <nav style={{ position: "sticky", width: "100%", zIndex: 1000 }}>
      <div className="nav-wrapper white">
        <button onClick={onMainPage} className="brand-logo left">
          PlaceFinder
        </button>
        <ul className="mr-20 right">
          {isLoggedIn ? (
            <>
              {!isAdmin && (
                <li>
                  <button className="home-btn mr-10 fs-4" onClick={toggleHome}>
                    Home
                  </button>
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
                      <button id="profile" onClick={togleProfile}>
                        View Profile
                      </button>
                    </li>
                    <li>
                      <button id="logout-btn" onClick={handleLogout}>
                        Logout <LogoutIcon className="h-1 w-1" />
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              {!isAdmin && (
                <>
                  <li>
                    <button className="home-btn mr-10 fs-4" onClick={toggleLogin}>
                      Login
                    </button>
                  </li>
                  <li>
                    <button className="home-btn mr-10 fs-4" onClick={toggleSignup}>
                      Signup
                    </button>
                  </li>
                </>
              )}
              {isAdmin && (
                <li>
                  <button className="home-btn mr-10 fs-4" onClick={toggleAdmin}>
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
