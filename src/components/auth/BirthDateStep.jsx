import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { requestOtp } from '../../store/asyncThunk/otpThunk';

const BirthDateStep = ({ userInfo, onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { dob: userInfo.dob }
  });

  const onSubmit = async (data) => {
    onNext(data)
  };

  return (
    <div className="w-full ">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">
        When's Your Birthday?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="date"
            autoFocus
            {...register('dob', {
              required: 'Birth date is required',
              validate: (value) => {
                const dob = new Date(value);
                const age = new Date().getFullYear() - dob.getFullYear();
                return age >= 13 || 'You must be at least 13 years old';
              }
            })}
            className="w-full p-3 pr-5 outline outline-2 dark:outline-1 bg-transparent text-black dark:text-white 
             rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/2 bg-gray-300 dark:bg-gray-800 text-black dark:text-white 
                         py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 
                         transition duration-300"
          >
            Back
          </button>
          <Button text={"Continue"} />
        </div>
      </form>
    </div>
  );
};

export default BirthDateStep;