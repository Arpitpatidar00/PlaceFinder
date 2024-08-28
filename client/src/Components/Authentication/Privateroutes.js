// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const accessToken = Cookies.get("accessToken");

  return accessToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
