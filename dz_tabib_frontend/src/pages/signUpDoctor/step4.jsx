import React, { useState } from "react";
import logo from "../../assets/logo.png";
import signupSuccessImage from "../../assets/project1.jpg"; // Example image to show success
import { AcceptedSignup } from "./AcceptedSignup";
import { RejectedSignup } from "./RejectedSignup";

export const step4 = () => {
  const [accountStatus, setAccountStatus] = useState(null); // null, "accepted", or "rejected"

  // Simulate a backend request or call a real API
  const checkAccountStatus = async () => {
    // Simulating backend response
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        const isAccepted = Math.random() > 0.5; // 50% chance of acceptance
        resolve(isAccepted ? "accepted" : "rejected");
      }, 1500); // Simulate delay
    });

    setAccountStatus(response);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-blue2 bg-opacity-10">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-blue2 bg-opacity-20 shadow-lg relative">
        <img src={logo} alt="DZ-Tabib Logo" className="h-16 absolute top-1 left-1" />
        
        {accountStatus === null ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-bluenuit mb-2">
              Finalizing your registration...
            </h2>
            <p className="text-gray-600 mb-4">
              Connect with patients effortlessly and manage your appointments anytime, from anywhere. Just press the button below to check your status.
            </p>
            <button
              className="bg-gradient-to-r from-blue to-blue2 opacity-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={checkAccountStatus}
            >
              Check Account Status
            </button>
          </div>
        ) : accountStatus === "accepted" ? (
          <AcceptedSignup />
        ) : (
          <RejectedSignup />
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src={signupSuccessImage}
          alt="Signup Illustration"
          className="absolute top-0 left-0 h-full w-full rounded-none lg:rounded-l-lg"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-blue-500 opacity-30"></div>
      </div>
    </div>
  );
};
