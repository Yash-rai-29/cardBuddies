// Signup.js

import React, { useState } from 'react';

function Signup({ setIsAuthenticated }) {
  const [error, setError] = useState(null);
  const handleSignup = async () => {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const aadharPhoto = document.getElementById('aadhar-photo').files[0];
  
    // Create FormData object
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('password', password);
    formData.append('aadharPhoto', aadharPhoto);
  
    try {
      // Send FormData with fetch
      const response = await fetch('your-api-url/signup', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setError(data.message); // Assuming your API returns an error message
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while signing up.');
    }
  };

  return (
   <>
   <div className='mt-10 mb-10'>
    <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto space-y-4">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" x2="4" y1="22" y2="15"></line>
          </svg>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium leading-none">
              First name
            </label>
            <input
              id="first-name"
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="First Name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium leading-none">
              Last name
            </label>
            <input
              id="last-name"
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              id="email"
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="age" className="text-sm font-medium leading-none">
              Age
            </label>
            <input
              id="age"
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your age"
              required
              type="number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="aadhar-photo" className="text-sm font-medium leading-none">
              Upload Aadhar Photo
            </label>
            <input
              id="aadhar-photo"
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              accept="image/*"
              required
              type="file"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <label htmlFor="password" className="text-sm font-medium leading-none">
                Password
              </label>
            </div>
            <input
              id="password"
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
              type="password"
            />
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white h-10 px-4 py-2 w-full"
            type="submit"
          >
            Create an account
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 text-gray-700 h-10 px-4 py-2 w-full"
            type="button"
          >
            Sign up with Google
          </button>
        </div>
        <div className="text-center text-sm">
          Already have an account? <a href="/login" className="underline">Sign in</a>
        </div>
      </div>
    </div>
    </div>
   </>
  );
}

export default Signup;
