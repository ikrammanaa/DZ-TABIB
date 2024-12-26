import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import signupSuccessImage from "../../assets/login1.jpg"; // Example image to show success

export const RejectedSignup = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/identifier'); // Navigate to the signup patient page
  };

  const handleContactUs = () => {
    navigate('/contactUs'); // Navigate to the contact us page
  };

  return (
    
    <div className="bg-green bg-opacity-30 rounded-lg shadow-lg p-6 max-w-md text-center">
     
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Sorry, your application to join DZ-Tabib as a patient is denied!
        </h2>
        <p className="text-gray-600 mb-4">
          You may contact us to resolve the problem if you don’t know the reason.
        </p>
        <div className="flex justify-center gap-4">
          {/* Try Again Button */}
          <button
            className="bg-gradient-to-r from-green to-blue2 opacity-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
          
          {/* Contact Us Button */}
          <button
            className="bg-gradient-to-r from-green to-blue2 opacity-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleContactUs}
          >
            Contact Us
          </button>
        </div>
      </div>

     
  );
};
