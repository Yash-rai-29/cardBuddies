import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
const RootLayout = ({isAuthenticated, AllowUser, setIsAuthenticated}) => {
  return (
    <>
    { isAuthenticated && AllowUser ? (
      <>
      <Navbar setIsAuthenticated={setIsAuthenticated}/>
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