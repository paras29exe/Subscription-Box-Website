import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { requestOtp, verifyOtp } from "../../store/asyncThunk/otpThunk";
import Button from "./Button";

const OtpStep = ({ userInfo, onNext, onBack }) => {
  const dispatch = useDispatch();
  const { otpSent, verifing, sendingOtp } = useSelector((state) => state.otp);
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({ defaultValues: { otp: "" } });

  const [resendCooldown, setResendCooldown] = useState(30);
  const [backendError, setBackendError] = useState(null);

  useEffect(() => {
      dispatch(requestOtp(userInfo.email));
      startCooldown();
  }, []);

  const startCooldown = () => {
    setResendCooldown(30);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = () => {
    if (resendCooldown === 0) {
      dispatch(requestOtp(userInfo.email));
      startCooldown();
    }
  };

  const onSubmit = async (data) => {
    clearErrors("otp"); // Clear form validation errors
    setBackendError(null); // Reset backend error

    const res = await dispatch(verifyOtp({ email: userInfo.email, otp: data.otp }));

    if (res.payload?.status === 200) {
      onNext(userInfo);
    } else {
      setBackendError("Invalid OTP. Please try again.");
      setError("otp", { type: "manual", message: "Invalid OTP" });
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white text-black">Verify Your Email</h2>
      <p className="text-center dark:text-gray-300 text-gray-600">A verification code has been sent to {userInfo.email?.toLowerCase().trim()}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <input
            type="number"
            autoFocus
            placeholder="Enter 6-digit OTP"
            {...register("otp", {
              required: backendError ? false : "OTP is required",
              pattern: backendError ? false : { value: /^\d{6}$/, message: "OTP must be 6 digits" },
            })}
            className="w-full p-3 bg-transparent outline-2 dark:outline-1 outline text-black dark:text-white 
             rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
        </div>
        {backendError ? <p className="text-red-500 text-sm">{backendError}</p> : errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

        <Button text={verifing ? "Verifying..." : sendingOtp ? "Sending OTP..." : "Verify OTP"} disabled={verifing} />

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Didn't receive the OTP?{" "}
          <button
            type="button"
            onClick={handleResendOTP}
            className={`text-blue-900 ${resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
          </button>
        </p>

        <button
          type="button"
          onClick={onBack}
          className="w-full bg-gray-300 dark:bg-gray-800 text-black dark:text-white py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition duration-300 mt-4"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default OtpStep;
