import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

const NameStep = ({ userInfo, onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { firstName: userInfo?.firstName, lastName: userInfo?.lastName }
  });

  const onSubmit = async (data) => {
    try {
      data.name = data.firstName + ' ' + data.lastName;
      onNext(data);
    } catch (error) {
      console.error("Update Name Error:", error);
    }
  };

  return (
    <div className="w-full ">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">
        What's Your Name?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            autoFocus
            placeholder="First Name"
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'First name must be at least 2 characters' }
            })}
            className="w-full p-3 outline outline-1 bg-transparent text-black dark:text-white rounded-lg 
                         focus:outline-none focus:ring-1 focus:ring-yellow-500 mb-4"
          />
          {errors.firstName && <p className="text-red-500 text-sm -mt-3">{errors.firstName.message}</p>}

          <input
            type="text"
            placeholder="Last Name (Optional)"
            {...register('lastName')}
            className="w-full p-3 outline outline-1 bg-transparent text-black dark:text-white rounded-lg 
                         focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
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

export default NameStep;