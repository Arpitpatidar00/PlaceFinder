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
    setIsProfileMenuOpen((prev) => !prev);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const isAdmin = userData?.role === "admin";

  return (
    <nav>
      <div className="nav">
        <button onClick={() => navigateTo("/")}>PlaceFinder</button>
        <ul>
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
                      <button id="profile" onClick={() => navigateTo("/profile")}>
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
                    <button className="home-btn mr-10 fs-4" onClick={() => navigateTo("/login")}>
                      Login
                    </button>
                  </li>
                  <li>
                    <button className="home-btn mr-10 fs-4" onClick={() => navigateTo("/signup")}>
                      Signup
                    </button>
                  </li>
                </>
              )}
              {isAdmin && (
                <li>
                  <button className="home-btn mr-10 fs-4" onClick={() => navigateTo("/admin")}>
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
