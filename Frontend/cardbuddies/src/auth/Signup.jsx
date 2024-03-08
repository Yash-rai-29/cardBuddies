// Signup.js

import React from 'react';
import { Link } from 'react-router-dom';

function Signup({ setIsAuthenticated }) {
  const handleSignup = () => {
    // Perform signup logic here
    // Assuming signup is successful
    setIsAuthenticated(true);
  };

  return (
    <div>
      <h2>Sign Up Page</h2>
      <form onSubmit={handleSignup}>
        {/* Signup form fields */}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
