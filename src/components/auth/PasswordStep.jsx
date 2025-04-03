import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react'; // Eye icons for show/hide toggle
import Button from './Button';
import { useSelector } from 'react-redux';

const PasswordStep = ({ userInfo, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: { password: userInfo?.password, confirmPassword: userInfo?.confirmPassword }
  });
  const { loading } = useSelector(state => state.auth)
  const { verified } = useSelector(state => state.otp)

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const passwordSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMatchError("Passwords do not match!");
      return null;
    }
    setPasswordMatchError("");
    
    if(!verified){
      setError("password", "Your otp verification has failed!");
    }
    onSubmit({...userInfo, ...data});
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">
        Create Your Password
      </h2>
      <form onSubmit={handleSubmit(passwordSubmit)} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              validate: {
                hasUpperCase: value => /[A-Z]/.test(value) || 'Must include an uppercase letter',
                hasLowerCase: value => /[a-z]/.test(value) || 'Must include a lowercase letter',
                hasNumber: value => /[0-9]/.test(value) || 'Must include a number'
              }
            })}
            className="w-full p-3 bg-transparent outline outline-2 dark:outline-1 text-black dark:text-white 
                         rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <button type="button" onClick={togglePasswordVisibility} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
            })}
            className="w-full p-3 bg-transparent outline outline-2 dark:outline-1 text-black dark:text-white 
                         rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
        {passwordMatchError && <p className="text-red-500 text-sm">{passwordMatchError}</p>}

        <Button text="Create Account" loading={loading} />
      </form>
    </div>
  );
};

export default PasswordStep;
