import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { account } from "../../appwriteAuth/appwrite.config";
import Button from "./Button";

const EmailStep = ({ onNext, userInfo }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: { email: userInfo?.email || "" },
  });
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await account.createEmailPasswordSession(data.email, "test"); // Attempt login with a fake password
    } catch (error) {
      if (error.code === 401) {
        setError("email", { type: "manual", message: "Email is already registered" });
      } else  {
        onNext(data);
      }
    } finally {
      setLoading(false);
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
        <Button text="Continue" loading={loading} />
      </form>
    </div>
  );
};

export default EmailStep;
