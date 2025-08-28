// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // If user is not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children; // If logged in → show the page
};

export default ProtectedRoute;
