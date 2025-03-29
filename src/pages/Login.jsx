// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    // Handle login logic here
    console.log(data);
  };

  return (
      <div className="w-full">
        {/* <h2 className="text-3xl font-medium mb-6 text-center dark:text-white text-black">
          Login to GetMeABox
        </h2> */}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }
              })}
              className="w-full p-3 bg-transparent outline outline-1 text-black dark:text-white 
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { 
                  value: 8, 
                  message: 'Password must be at least 8 characters' 
                }
              })}
              className="w-full p-3 bg-transparent outline outline-1 text-black dark:text-white 
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         text-gray-600 dark:text-gray-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <div className="flex justify-between items-center">
            <Link 
              to="/forgot-password" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          
          <Button text={"Login"} />
          
          <div className="text-center mt-4">
            <p className="dark:text-gray-300 text-gray-600">
              Don't have an account? {' '}
              <Link 
                to="/auth/signup/1" 
                className="text-yellow-600 dark:text-yellow-400 hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
        
        {/* Optional Social Login */}
        <div className="mt-6">
          <div className="flex items-center justify-center space-x-4">
            <hr className="w-1/4 border-gray-300 dark:border-gray-700" />
            <span className="text-gray-500 dark:text-gray-400">Or continue with</span>
            <hr className="w-1/4 border-gray-300 dark:border-gray-700" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <button 
              className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-gray-300/35 dark:hover:bg-gray-700/35 transition"
            >
              Google
            </button>
            <button 
              className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-gray-300/35 dark:hover:bg-gray-700/35 transition"
            >
              Facebook
            </button>
            <button 
              className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-gray-300/35 dark:hover:bg-gray-700/35 transition"
            >
              Apple
            </button>
          </div>
        </div>
      </div>
  );
};

export default Login;