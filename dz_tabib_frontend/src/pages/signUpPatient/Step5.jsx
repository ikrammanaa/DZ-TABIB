
import React, {useState} from "react";
import logo from "../../assets/logo.png";
import signupSuccessImage from "../../assets/login1.jpg"; // Example image to show success
import { AcceptedSignup } from './AcceptedSignup';
import { RejectedSignup } from './RejectedSignup';

export const Step5 = ({ nextStep }) => {
 
  const [accountStatus, setAccountStatus] = useState(null); // null, "accepted", or "rejected"

  // Simulez une requête backend ou appelez une API réelle
  const checkAccountStatus = async () => {
    // Simulation d'une réponse du backend
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        const isAccepted = Math.random() > 0.5; // 50% chance
        resolve(isAccepted ? "accepted" : "rejected");
      }, 1000); // Simule un délai
    });

    setAccountStatus(response);
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-blue2 bg-opacity-10">
      
    {/* Left Section: File Upload */}
    
  <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-green bg-opacity-10 shadow-lg relative">
  <img src={logo} alt="DZ-Tabib Logo" className="h-16 absolute top-1 left-1" />
  {accountStatus === null ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Checking your account...</h1>
          <button
            className="bg-gradient-to-r from-green to-blue2 opacity-500 text-white py-3 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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
          alt="Login Illustration"
          className="absolute top-0 left-0 h-full w-full  rounded-none lg:rounded-l-lg"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-blue-500"></div>
      </div>
      </div>
    
  );
};
