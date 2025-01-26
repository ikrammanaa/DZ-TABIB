import React, { useState } from 'react';
import { step1 as Step1 } from './step1';
import { step2 as Step2 } from './step2';
import { step3 as Step3 } from './step3';
import { step4 as Step4 } from './step4';

export const SignUpDoctor = () => {
  const [step, setStep] = useState(1);  // Start at Step 1
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  const handleNextStep = (data) => {
    setUserData(data);  // Store data from Step 1
    setStep(2);  // Move to Step 2
  };

  const handleResendOTP = () => {
    console.log('Resend OTP logic');
  };

  const handleFinalStep = () => {
    setStep(4);  // Move to Step 4
  };

  const handleFinalAction = () => {
    alert('Account successfully created!');
    // Finalize logic (e.g., redirect, show success message)
  };

  return (
    <div>
      {step === 1 ? (
        <Step1 nextStep={handleNextStep} />
      ) : step === 2 ? (
        <Step2 userData={userData} nextStep={() => setStep(3)} resendOTP={handleResendOTP} />
      ) : step === 3 ? (
        <Step3 nextStep={handleFinalStep} />
      ) : (
        <Step4 nextStep={handleFinalAction} />
      )}
    </div>
  );
};
