// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import { account } from '../appwriteAuth/appwrite.config.js';
import Cookies from 'js-cookie';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      // Step 1: Login User
      const session = await account.createEmailPasswordSession(email, password);
      console.log("User Logged In:", session);

      // Step 2: Generate JWT
      const jwtResponse = await account.createJWT();
      console.log("JWT Token:", jwtResponse.jwt);

      // Step 3: Store JWT in Cookies
      Cookies.set('accessToken', jwtResponse.jwt, {
        expires: 7, // Expires in 7 days
        secure: true, // Ensures it is sent over HTTPS
        sameSite: 'Strict', // Prevents CSRF attacks
      });

      console.log("JWT stored in cookies");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="w-full">

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
              to="/auth/signup/email"
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
                         hover:bg-black hover: text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Google
          </button>
          <button
            className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-black hover: text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Facebook
          </button>
          <button
            className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-black hover: text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;