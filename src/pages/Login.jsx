// src/components/auth/Login.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/auth/Button';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin, loginUser } from '../store/asyncThunk/authThunk.js';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, userData } = useSelector(state => state.auth)

  const onSubmit = async (data) => {

    try {
      await dispatch(loginUser(data)).unwrap()
      navigate("/", {replace : true})
    } catch (error) {
      setError("password", {type: "manual" , message: error.message})
    }
  };

  useEffect(() => {
    if(userData) navigate("/")
  },[])
  
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
            className="w-full p-3 bg-transparent outline outline-2 dark:outline-1 text-black dark:text-white 
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
            className="w-full p-3 bg-transparent outline outline-2 dark:outline-1 text-black dark:text-white 
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
        </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

        <div className="flex justify-between items-center">
          <Link
            to="/forgot-password"
            className="text-blue-800 dark:text-indigo-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button text={"Login"} loading={loading} />

        <div className="text-center mt-4">
          <p className="dark:text-gray-300 text-gray-900">
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
          <span className="text-gray-900 dark:text-gray-400">Or continue with</span>
          <hr className="w-1/4 border-gray-300 dark:border-gray-700" />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <button
            className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-black hover:text-white text-black dark:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Google
          </button>
          <button
            className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-black hover:text-white text-black dark:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Facebook
          </button>
          <button
            className="bg-transparent outline outline-1 p-3 rounded-lg flex items-center justify-center 
                         hover:bg-black hover:text-white text-black dark:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;