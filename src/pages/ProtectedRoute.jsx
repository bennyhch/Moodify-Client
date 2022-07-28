import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { correctAuth } = useSelector((store) => store.login);

  if (!correctAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
