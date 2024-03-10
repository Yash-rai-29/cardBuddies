import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function AuthLayout({ isAuthenticated, AllowUser }) {
  return (
    <>
      {isAuthenticated && AllowUser ? (
        <Navigate to="/home" />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default AuthLayout;
