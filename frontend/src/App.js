import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/Auth/AuthLayout';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Root/Home';
import RootLayout from './components/Root/RootLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Your authentication logic here
  }, []);

  return (
    <main className="h-screen">
      {/* <Router> */}
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout isAuthenticated={isAuthenticated} />}>
          <Route path='/login' element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/signup' element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}>
          <Route path='/' element={<Home />} />
        </Route> 

        {/* Redirect to login page if not authenticated */}
        <Route index element={<Navigate to='/login' replace />} />
      </Routes>
      {/* </Router> */}
    </main>
  );
}

export default App;
