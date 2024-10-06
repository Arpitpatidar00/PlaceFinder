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
import AdminLogin from "./Admin/AdminLoginPage.js";
import AdminPage from "./Admin/DataEntry/AdminPage.js";

import AdminRegisteration from "./Admin/DataEntry/Adminregistration.js";
import { AuthProvider } from "./Context/AuthContext.js";
import PrivateRoute from "./Components/Authentication/Privateroutes.js"; // Import PrivateRoute
import AdminMiddleware from "./Admin/AdminVerifecation.js";
// import NotPrivateRoute from "./Components/Authentication/Privateroutes.js";

function Start() {
  const location = useLocation();
  const hideFooterRoutes = [
    "/login",
    "/signup",
    "/",
    "/Feedback",
    "/Adminhome",
    "/admin",
    "/profile",
  ];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StartPage />} />

        {/* <Route path="/login" element={< NotPrivateRoute element={Signin} />} /> */}
        <Route path="/login" element={<Signin />} />

        {/* Admin Routes - Protected */}
        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
        <Route
          path="/admin-login"
          element={
            <AdminMiddleware>
              <AdminLogin />
            </AdminMiddleware>
          }
        />
        <Route
          path="/admin-registration"
          element={
            <PrivateRoute element={AdminRegisteration} requiredRole="admin" />
          }
        />
        <Route
          path="/adminhome"
          element={<PrivateRoute element={AdminPage} requiredRole="admin" />}
        />

        {/* Private User Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={Home}
              requiredRoles={["user", "guide", "driver"]}
            />
          }
        />
        <Route
          path="/Feedback"
          element={
            <PrivateRoute
              element={Feedback}
              requiredRoles={["user", "guide", "driver"]}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={Profile}
              requiredRoles={["user", "guide", "driver"]}
            />
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRoute
              element={ImageDetails}
              requiredRoles={["user", "guide", "driver"]}
            />
          }
        />

        {/* Admin Dashboard - Example Private Admin Route */}
        {/* <Route path="/admin/dashboard" element={<PrivateRoute element={AdminDashboard} requiredRole="admin" />} /> */}
      </Routes>
      {shouldShowFooter && <Footer />}
    </AuthProvider>
  );
}

export default Start;
