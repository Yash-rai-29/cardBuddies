import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const RootLayout = ({isAuthenticated, setIsAuthenticated}) => {
  return (
    <>
    { isAuthenticated ? (
      <>
     <Outlet/>
     </>
      ) : (
        <>
        <Navigate to="/login" />
      </>
    )}
    </>
  )
}

export default RootLayout