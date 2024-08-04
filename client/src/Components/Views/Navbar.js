
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import LogoutIcon from "@mui/icons-material/Logout";
// // import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../../actions/authActions";
// // import "./Navbar.css";

// // const Navbar = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { userData } = useSelector((state) => state.auth);

// //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
// //   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile dropdown menu

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate("/");
// //   };

 

// //   const toggleProfileMenu = () => {
// //     setIsProfileMenuOpen(!isProfileMenuOpen);
// //   };
// //   const togleprofile =()=>{
// //     navigate("/profile")
// //   }
// //   const togglehome=()=>{
// //     navigate("/home")

// //   }
// //   const togglelogin=()=>{
// //     navigate("/login")

// //   }
// //   const togglesignup=()=>{
// //     navigate("/signup")

// //   }
// // const onmainpage=()=>{
// //   navigate("/")
// // }
// // const toggleAdmin=()=>{
// //   navigate("/admin-registration")
// // }

// //   return (
// //     <>
// //       <nav style={{ position: "sticky", width: "100%", zIndex: 1000 }}>
// //         <div className="nav-wrapper white">
// //           <button to="/" onClick={onmainpage} className="brand-logo left">
// //             PlaceFinder
// //           </button>
// //           <ul className="mr-20 right">
// //             {isLoggedIn ? (
// //               <>
// //                 <li>
// //                   <button className="home-btn mr-10 fs-4" onClick={togglehome} to="/home">Home</button>
// //                 </li>
               
// //                 <li className="profile-menu" onClick={toggleProfileMenu}>
// //                   <img
// //                     src={`data:image/png;base64,${userData.image}`}
// //                     alt="User Profile"
// //                     className="user-image"
// //                   />
// //                   {isProfileMenuOpen && (
// //                     <ul className="profile-dropdown">
// //                       <li>
// //                         <button id="profile" onClick={togleprofile}>View Profile</button>
// //                       </li>
// //                       <li>
// //                         <button id="logout-btn" onClick={handleLogout}>
// //                           Logout <LogoutIcon className="h-1 w-1" />
// //                         </button>
// //                       </li>
// //                     </ul>
// //                   )}
// //                 </li>
// //               </>
// //             ) : (
// //               <>
// //                 <li>
// //                   <button className="home-btn mr-10 fs-4	" onClick={togglelogin} to="/login">Login</button>
// //                 </li>
// //                 <li>
// //                   <button className="home-btn mr-10 fs-4	" onClick={togglesignup} to="/signup">Signup</button>
// //                 </li>
// //                 <li>
// //                   <button className="home-btn mr-10 fs-4	" onClick={toggleAdmin} to="/signup">Admin</button>
// //                 </li>
// //               </>
// //             )}
// //           </ul>
// //         </div>
// //       </nav>
// //     </>
// //   );
// // };

// // export default Navbar;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../actions/authActions";
// import "./Navbar.css";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { userData, isLoggedIn } = useSelector((state) => state.auth);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile dropdown menu

//   useEffect(() => {
//     setIsProfileMenuOpen(false); // Close the profile menu when the route changes
//   }, [location.pathname]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(!isProfileMenuOpen);
//   };

//   const togleProfile = () => {
//     navigate("/profile");
//   };

//   const toggleHome = () => {
//     navigate("/home");
//   };

//   const toggleLogin = () => {
//     navigate("/login");
//   };

//   const toggleSignup = () => {
//     navigate("/signup");
//   };

//   const onMainPage = () => {
//     navigate("/");
//   };

//   const toggleAdmin = () => {
//     navigate("/admin");
//   };

//   const isAdminRoute = location.pathname === "/Adminhome";

//   return (
//     <nav style={{ position: "sticky", width: "100%", zIndex: 1000 }}>
//       <div className="nav-wrapper white">
//         <button onClick={onMainPage} className="brand-logo left">
//           PlaceFinder
//         </button>
//         <ul className="mr-20 right">
//           {isLoggedIn ? (
//             <>
//               <li>
//                 <button className="home-btn mr-10 fs-4" onClick={toggleHome}>Home</button>
//               </li>
//               <li className="profile-menu" onClick={toggleProfileMenu}>
//                 <img
//                   src={`data:image/png;base64,${userData.image}`}
//                   alt="User Profile"
//                   className="user-image"
//                 />
//                 {isProfileMenuOpen && (
//                   <ul className="profile-dropdown">
//                     <li>
//                       <button id="profile" onClick={togleProfile}>View Profile</button>
//                     </li>
//                     <li>
//                       <button id="logout-btn" onClick={handleLogout}>
//                         Logout <LogoutIcon className="h-1 w-1" />
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </>
//           ) : (
//             <>
//               {!userData?.role && (
//                 <>
//                   <li>
//                     <button className="home-btn mr-10 fs-4" onClick={toggleLogin}>Login</button>
//                   </li>
//                   <li>
//                     <button className="home-btn mr-10 fs-4" onClick={toggleSignup}>Signup</button>
//                   </li>
//                 </>
//               )}
//               {isAdminRoute && (
//                 <li>
//                   <button className="home-btn mr-10 fs-4" onClick={toggleAdmin}>Admin</button>
//                 </li>
//               )}
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
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
