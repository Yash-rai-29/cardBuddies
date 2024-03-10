// Signup.js
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function Signup({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const handleSignup = async (event) => {

    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target); // Access form data from event target

    const userData = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      age: formData.get("age"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };
    console.log("User Data:", userData);
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        // Save userRecord in cookie
        Cookies.set("userRecord", response.userRecord);
        // Show success toast message
        toast.success("Congratulations! Your account has been created.", {
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate('/login'); // Navigate to login page
        }, 5000);
      } else {
        toast.error(data.message, { autoClose: 5000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while signing up.", { autoClose: 5000 });
    }
  };

  return (
    <>
      <div className="mt-10 mb-10">
        <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md mx-auto space-y-4">
            <ToastContainer />
            <form onSubmit={handleSignup} className="space-y-4">
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
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your information to create an account
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-none"
                >
                  First name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-none"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="age"
                  className="text-sm font-medium leading-none"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your age"
                  required
                  type="number"
                  min="18" // Set the minimum age requirement
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium leading-none"
                >
                  Phone Number
                </label>
                <div className="flex items-center">
                  <input
                    id="phone"
                    name="phone"
                    className="flex-1 h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    type="tel"
                    placeholder="Phone Number"
                    defaultValue="+91" // Set default value to include country code
                    pattern="^\+?\d{10,}$" // Set pattern to enforce 10 or more digits after the country code
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
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
            </form>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
