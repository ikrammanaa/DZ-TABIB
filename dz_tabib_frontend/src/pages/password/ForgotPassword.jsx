
import React, { useState, useEffect } from "react";
import { ResetPassword } from "./ResetPassword";
import login from "../../assets/login4.jpg";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
 // Simulate email submit (mocked API)
  // const handleEmailSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Replace with your backend API endpoint
  //     const response = await fetch("/api/forget-password", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });
  //     if (response.ok) {
  //       setStep(2);
  //     } else {
  //       setError("Email not found or error occurred.");
  //     }
  //   } catch (err) {
  //     setError("Server error. Please try again.");
  //   }
  // };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    setError(""); // Clear any previous error

    setTimeout(() => {
      if (email === "test@gmail.com") {
        setStep(2);
      } else {
        setError("Email not found.");
      }
      setIsLoading(false); // Set loading to false after API call
    }, 1000); // Simulate delay
  };

  // Simulate OTP submit (mocked API)
  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/verify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, otp }),
  //     });
  //     if (response.ok) {
  //       setStep(3);
  //     } else {
  //       setError("Invalid OTP. Please try again.");
  //     }
  //   } catch (err) {
  //     setError("Server error. Please try again.");
  //   }
  // };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    setError(""); // Clear any previous error

    setTimeout(() => {
      const enteredOtp = otp.join("");
      if (enteredOtp === "123456") { // Mock valid OTP
        setStep(3);
      } else {
        setError("Invalid OTP.");
      }
      setIsLoading(false); // Set loading to false after API call
    }, 1000); // Simulate delay
  };

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

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="flex flex-col rounded bg-gray-50">
        {step === 1 && (
          <form
            onSubmit={handleEmailSubmit}
            className="bg-blue bg-opacity-20  p-8 rounded shadow-md w-96"
          >
            <h2 className="text-2xl text-bluenuit font-bold mb-4">Forget Password</h2>
            <input
              type="email"
              className="border p-2 rounded mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue to-blue2 opacity-500 text-white py-2 px-10 rounded-lg shadow-md hover:shadow-lg transition-transform focus:ring-2 focus:ring-blue-400 focus:outline-none text-white rounded hover:bg-blue-600 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Send OTP"
              )}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={handleOtpSubmit}
            className="bg-blue bg-opacity-20  p-8 rounded shadow-md w-96"
          >
            <h2 className="text-2xl text-bluenuit font-bold mb-4">Verify OTP</h2>
            <div className="flex justify-center space-x-2 mb-4 ">
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
            <button
              type="submit"
              className="bg-gradient-to-r from-blue to-blue2 opacity-500 text-white py-2 px-10 rounded-lg shadow-md hover:shadow-lg transition-transform focus:ring-2 focus:ring-blue-400 focus:outline-none text-white rounded hover:bg-blue-600 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                "Verify OTP"
              )}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        )}

        {step === 3 && <ResetPassword email={email} />}
      </div>
    </div>
  );
};
