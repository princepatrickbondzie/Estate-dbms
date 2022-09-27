import React from "react";
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserState } from "../state/store";

export default function UserRoutes({ path, component: Component, ...rest }) {
  const isLoggedIn = useUserState((state) => state.isLoggedIn)
  console.log(isLoggedIn);
  
  useEffect(() => {
    
  })

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={(path = window.location.pathname)} />
  );
}
