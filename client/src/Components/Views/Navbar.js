
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile dropdown menu

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

 

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  const togleprofile =()=>{
    navigate("/profile")
  }
  const togglehome=()=>{
    navigate("/home")

  }
  const togglelogin=()=>{
    navigate("/login")

  }
  const togglesignup=()=>{
    navigate("/signup")

  }
const onmainpage=()=>{
  navigate("/")
}

  return (
    <>
      <nav style={{ position: "sticky", width: "100%", zIndex: 1000 }}>
        <div className="nav-wrapper white">
          <button to="/" onClick={onmainpage} className="brand-logo left">
            PlaceFinder
          </button>
          <ul className="mr-20 right">
            {isLoggedIn ? (
              <>
                <li>
                  <button className="home-btn mr-10 fs-4" onClick={togglehome} to="/home">Home</button>
                </li>
               
                <li className="profile-menu" onClick={toggleProfileMenu}>
                  <img
                    src={`data:image/png;base64,${userData.image}`}
                    alt="User Profile"
                    className="user-image"
                  />
                  {isProfileMenuOpen && (
                    <ul className="profile-dropdown">
                      <li>
                        <button id="profile" onClick={togleprofile}>View Profile</button>
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
                <li>
                  <button className="home-btn mr-10 fs-4	" onClick={togglelogin} to="/login">Login</button>
                </li>
                <li>
                  <button className="home-btn mr-10 fs-4	" onClick={togglesignup} to="/signup">Signup</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
