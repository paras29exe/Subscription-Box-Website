import React from 'react';
import { useForm } from 'react-hook-form';
import AuthLayout from './AuthLayout';
import Button from './Button';

const PasswordStep = ({ userInfo, onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { password: userInfo?.password, confirmPassword: userInfo?.confirmPassword }
  });

  const passwordSubmit = (data) => {
    onSubmit(data);
  };

  return (
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">
          Create Your Password
        </h2>
        <form onSubmit={handleSubmit(passwordSubmit)} className="space-y-4">
          <div>
            <input
              type="password"
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
              className="w-full p-3 bg-transparent outline outline-1 text-black dark:text-white 
                         rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500 mb-4"
            />
            {errors.password && <p className="text-red-500 text-sm -mt-3">{errors.password.message}</p>}
            
            <input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === watch('password') || 'Passwords do not match'
              })}
              className="w-full p-3 bg-transparent outline outline-1 text-black dark:text-white 
                         rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
         <Button text={"Create Account"} />
        </form>
      </div>
  );
};

export default PasswordStep;