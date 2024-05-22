// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.js";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
