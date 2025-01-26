import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import singupImag from "../../assets/login1.jpg";
import { useNavigate } from "react-router-dom";
export const Step2 = ({ nextStep, resendOTP }) => {
  const navigate = useNavigate();


  // Function to handle logo click and navigate to homepage
  const handleLogoClick = () => {
    navigate("/"); // Navigate to the homepage
  };
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Focus the first input on load
  useEffect(() => {
    document.getElementById("otp-input-0").focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric values
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const verifyOTP = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === otp.length) {
      console.log("Entered OTP:", enteredOtp);
      nextStep(); // Proceed to the next step if OTP is valid
    } else {
      alert("Please enter the full OTP");
    }
  };

  return( 
    <div className="flex flex-col lg:flex-row h-screen bg-blue2 bg-opacity-10">
      {/* Left Section: OTP Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-green bg-opacity-10 shadow-lg relative">
      <img
        src={logo}
        alt="DZ-Tabib Logo"
        className="h-16 absolute top-0 left-2 cursor-pointer
        transition-transform duration-300 hover:scale-110"
        onClick={handleLogoClick} // Add onClick handler to navigate to homepage
      />

        <h1 className="text-3xl font-extrabold text-bluenuit mb-5">Create An Account</h1>
        <p className="text-gray-600">
          We have sent you a <span className="font-semibold text-blue">One Time Password</span> to your email
        </p>

        <div className="flex justify-center space-x-4 mb-20 mt-20 ">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={resendOTP}
            className="mr-10 px-8 py-4 bg-gradient-to-r from-blue2 to-green opacity-500 hover:bg-gray-400 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform text-sm"
          >
            Resend OTP
          </button>
          <button
            type="button"
            onClick={verifyOTP}
            className="ml-10 px-10 py-4 bg-gradient-to-r from-green to-blue2 opacity-500 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform text-sm"
          >
            Verify OTP
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="h-full lg:w-1/2 relative">
        <img
          src={singupImag}
          alt="Login Illustration"
          className="absolute hidden lg:block top-0 left-0 h-full w-full rounded-none lg:rounded-l-lg"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-blue-500"></div>
      </div>
    </div>
  );
};
