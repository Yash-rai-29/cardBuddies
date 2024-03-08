import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

function Authlayout({ isAuthenticated, setIsAuthenticated}) {


  return (
    <>
    { isAuthenticated ? (
      <Navigate to="/home" />
      ) : (
        <>
        <Outlet/>
      </>
    )}
    </>
  )
}

export default Authlayout