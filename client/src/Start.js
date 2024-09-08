

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Views/Navbar";
import Footer from "./Components/Views/Footer";
import Home from "./Components/Views/Home";
import Feedback from "./Components/Views/Feedback";
import Profile from "./Components/Views/Profile.js";
import ImageDetails from "./Components/PlaceData/ImageDetails.js";
import StartPage from "./Components/Views/StartPage.js";
import Signin from "./Components/Authentication/Signin.js";
import Signup from "./Components/Authentication/Signup.js";
import Adminlogin from "./Admin/AdminLoginPage.js";
import AdminPage from "./Admin/DataEntry/AdminPage.js";
import AdminRegisteration from "./Admin/DataEntry/Adminregistration.js";
import { AuthProvider } from "./Context/AuthContext.js";
import PrivateRoute from "./Components/Authentication/Privateroutes.js"; // Import PrivateRoute

function Start() {
  const location = useLocation();
  const hideFooterRoutes = [
    "/login",
    "/signup",
    "/",
    "/Feedback",
    "/Adminhome",
    "/admin",
    "/profile"
  ];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StartPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/Adminhome" element={<Adminlogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin-registration" element={<AdminRegisteration />} />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/Feedback" element={<PrivateRoute element={Feedback} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/details/:id" element={<PrivateRoute element={ImageDetails} />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </AuthProvider>
  );
}

export default Start;
