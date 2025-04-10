import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import axiosInstance from "../../utils/axiosInstance";

const EmailStep = ({ onNext, userInfo }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: { email: userInfo?.email || "" },
  });


  const onSubmit = async (data) => {
    try {
      // if email does not exist in system then proceed to next step
      await axiosInstance.post("/auth/check-email-existence", { email: data.email });
      onNext(data)
    } catch (error) {
      console.log(error)
      setError("email", { type: "manual", message: error.response.data.message });
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">
        Enter Your Email
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            autoFocus
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            className="w-full p-3 bg-transparent text-black dark:text-white rounded-lg outline outline-2 dark:outline-1
                         focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <Button text="Continue"/>
      </form>
    </div>
  );
};

export default EmailStep;
