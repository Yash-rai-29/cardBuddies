import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/Auth/AuthLayout';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Root/Home';
import RootLayout from './components/Root/RootLayout';
import Cookies from "js-cookie";
import LoadingSpinner from './LoadingSpinner'
import Profile from './components/Root/Account/Profile';
import AddCard from './components/Root/Card/AddCard';
import AvailableCard from './components/Root/Card/AvailableCard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [AllowUser, setAllowUser] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setCheckUser(true); // Trigger verification process
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (checkUser && accessToken) {
      setIsLoading(true); 
      fetch('http://localhost:3000/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accessToken })
      })
      .then(response => response.json())
      .then(data => {
        setIsAuthenticated(data.isAuthenticated);
        if (data.isAuthenticated) {
          console.log(data.isAuthenticated);
          Cookies.set('user', data.user);
          localStorage.setItem('auth', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
          setAllowUser(data.allowUser);
        }
        console.log('Verification response:', data);
      })
      .catch(error => {
        console.error('Error verifying user:', error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when the request is completed
      });
    }
  }, [checkUser]);

  return (
    <main className="h-screen">
      {isLoading && <LoadingSpinner />}
      {/* <Router> */}
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout isAuthenticated={isAuthenticated} AllowUser={AllowUser}  />}>
          <Route path='/login' element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/signup' element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} AllowUser={AllowUser} />}>
          <Route path='/' element={<Home />} />
          <Route path='/account/profile' element={<Profile />} />
          <Route path='/add-card' element={<AddCard />} />
          <Route path='/avaiable-card' element={<AvailableCard />} />
        </Route> 

        {/* Redirect to login page if not authenticated */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
        {/* <Route index element={<Navigate to='/login' replace />} /> */}
      </Routes>
      {/* </Router> */}
    </main>
  );
}

export default App;
