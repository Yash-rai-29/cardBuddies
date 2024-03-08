// App.jsx

import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Authlayout from './auth/Authlayout';
import Login from './auth/Login';
import Signup from './auth/Signup';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Your authentication logic here, e.g., checking if the user is logged in
    // and updating isAuthenticated state accordingly
  }, []);

  return (
    <main className="h-screen">
      <Routes>
        {/* Public routes */}
        <Route
          element={
            <Authlayout isAuthenticated={isAuthenticated}>
              <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            </Authlayout>
          }
        />

        {/* Redirect to login page if not authenticated */}
        <Route index element={<Navigate to="/login" replace />} />
      </Routes>
    </main>
  );
}

export default App;
