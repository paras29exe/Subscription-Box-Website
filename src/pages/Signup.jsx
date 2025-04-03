import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import EmailStep from "../components/auth/EmailStep";
import NameStep from "../components/auth/NameStep";
import BirthDateStep from "../components/auth/BirthDateStep";
import OtpStep from "../components/auth/OtpStep";
import PasswordStep from "../components/auth/PasswordStep";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/asyncThunk/authThunk";

const steps = ["email", "name", "dob", "otp-verification", "password"]; // Define step order

const SignUp = () => {
  const { step } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { userData } = useSelector(state => state.auth)

  useEffect(() => {
    if (!steps.includes(step)) {
      navigate("/auth/signup/email"); // Default to first step
    }
  }, [step, navigate]);

  const handleNextStep = (data) => {
    setUserInfo((prev) => ({ ...prev, ...data }));

    const currentIndex = steps.indexOf(step);
    if (currentIndex !== -1 && currentIndex < steps.length - 1) {
      navigate(`/auth/signup/${steps[currentIndex + 1]}`);
    }
  };

  const handleBackStep = () => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      navigate(`/auth/signup/${steps[currentIndex - 1]}`);
    }
  };

  const handleFinalSubmit = async (data) => {
    // to ensure state get updated properly

    try {
      await dispatch(signupUser(data)).unwrap();
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    if (userData) navigate("/")
  }, [])

  const renderStep = () => {
    switch (step) {
      case "email":
        return <EmailStep onNext={handleNextStep} userInfo={userInfo} />;
      case "name":
        return <NameStep userInfo={userInfo} onNext={handleNextStep} onBack={handleBackStep} />;
      case "dob":
        return <BirthDateStep userInfo={userInfo} onNext={handleNextStep} onBack={handleBackStep} />;
      case "otp-verification":
        return <OtpStep userInfo={userInfo} onNext={handleNextStep} onBack={handleBackStep} />;
      case "password":
        return <PasswordStep userInfo={userInfo} onSubmit={handleFinalSubmit} onBack={handleBackStep} />;
      default:
        return <EmailStep onNext={handleNextStep} />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default SignUp;
