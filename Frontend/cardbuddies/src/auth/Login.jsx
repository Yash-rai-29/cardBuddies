import React from 'react'

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogin = () => {
        // Perform login logic here
        // Assuming login is successful
        setIsAuthenticated(true);
      };
    
  return (
   <>
   <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8">
   <div className="w-full max-w-md mx-auto space-y-4">
     <div className="text-center">
       <svg className="mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
         <line x1="4" y1="22" x2="4" y2="15"></line>
       </svg>
       <h1 className="text-3xl font-bold">Welcome back</h1>
       <p className="text-gray-500 dark:text-gray-400">Enter your email below to login to your account</p>
     </div>
     <div className="space-y-4">
       <div className="space-y-2">
         <label htmlFor="email" className="block">Email</label>
         <input id="email" className="w-full border-gray-300 rounded-md shadow-sm h-11" placeholder="m@example.com" type="email" />
       </div>
       <div className="space-y-2">
         <div className="flex items-center">
           <label htmlFor="password" className="block">Password</label>
           <a className="ml-auto inline-block text-sm underline" href="#">Forgot your password?</a>
         </div>
         <input id="password" className="w-full border-gray-300 rounded-md shadow-sm h-11" type="password" />
       </div>
       <div className="flex items-center space-x-2">
         <input id="remember" className="border-gray-300 rounded" type="checkbox" />
         <label htmlFor="remember" className="text-sm leading-none">Remember me</label>
       </div>
       <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
         Login
       </button>
       <button className="w-full border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
         Login with Google
       </button>
     </div>
     <div className="text-center text-sm">
       Don't have an account?
       <a className="underline" href="#">Sign up</a>
     </div>
   </div>
 </div>
   </>
  )
}

export default Login
