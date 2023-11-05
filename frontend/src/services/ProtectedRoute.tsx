import { Navigate } from "react-router-dom";
import React from "react";

import { useAuthStore } from "../App/store/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
