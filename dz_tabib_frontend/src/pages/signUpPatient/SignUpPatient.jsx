import React, { useState } from 'react';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';
export const SignUpPatient = () => {
  const [step, setStep] = useState(1);  // Start at Step 1
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  const handleNextStep = (data) => {
    setUserData(data);  // Store data from Step 1
    setStep(2);  // Move to Step 2
  };

  const handleResendOTP = () => {
    // Add logic to resend OTP
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
      ) : step === 4 ? (
        <Step4 nextStep={() => setStep(5)} />
      ) : (
        <Step5 nextStep={handleFinalAction} />
      )}
    </div>
  );
};


