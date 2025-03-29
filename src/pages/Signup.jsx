import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmailStep from "../components/auth/EmailStep";
import NameStep from "../components/auth/NameStep";
import BirthDateStep from "../components/auth/BirthDateStep";
import OtpStep from "../components/auth/OtpStep";
import PasswordStep from "../components/auth/PasswordStep";

const SignUp = () => {
  const navigate = useNavigate();
  const { step } = useParams(); // Get step from URL
  const [userInfo, setUserInfo] = useState({});

  // Convert step from string to number & set default to 1
  const currentStep = parseInt(step) || 1;

  useEffect(() => {
    if (!step) navigate("/auth/signup/1", { replace: true }); // Ensure default step in URL
  }, [step, navigate]);

  const handleNextStep = (data) => {
    setUserInfo((prev) => ({ ...prev, ...data }));
    navigate(`/auth/signup/${currentStep + 1}`); // Update step in URL
  };

  const handleBackStep = () => {
    if (currentStep > 1) navigate(`/auth/signup/${currentStep - 1}`);
  };

  const handleFinalSubmit = (finalData) => {
    console.log("Final Registration Data:", finalData);
    // Redirect or show success message
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailStep onNext={handleNextStep} userInfo={userInfo} />;
      case 2:
        return <NameStep userInfo={userInfo} onNext={handleNextStep} onBack={handleBackStep} />;
      case 3:
        return <BirthDateStep userInfo={userInfo} onNext={handleNextStep} onBack={handleBackStep} />;
      case 4:
        return <OtpStep userInfo={userInfo} onNext={handleNextStep} onBack={handleBackStep} />;
      case 5:
        return <PasswordStep userInfo={userInfo} onSubmit={handleFinalSubmit} onBack={handleBackStep} />;
      default:
        return <EmailStep onNext={handleNextStep} />;
    }
  };

  return <div>{renderStep()}</div>;
};

export default SignUp;
