import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function AuthLayout({ isAuthenticated }) {
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default AuthLayout;
