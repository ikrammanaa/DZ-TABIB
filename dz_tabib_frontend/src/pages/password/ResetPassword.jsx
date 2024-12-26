import React, { useState } from "react";
import login from "../../assets/identifier1.jpg";
export const ResetPassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setSuccess("Password reset successful!");
      } else {
        setError("Error resetting password. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setIsLoading(false); // Stop loading
  };

  return (
    
    <form
      onSubmit={handleResetSubmit}
      className="bg-blue bg-opacity-20  p-8 rounded shadow-md w-96"
    >
      <h2 className="text-2xl text-bluenuit font-bold mb-4">Reset Password</h2>
      <input
        type="password"
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full border p-2 rounded mb-4"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue to-blue2 opacity-500 text-white py-2 px-10 rounded-lg shadow-md  hover:shadow-lg transition-transform focus:ring-2 focus:ring-blue-400 focus:outline-none text-white  rounded hover:bg-blue-600 flex items-center justify-center"
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
          "Reset Password"
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green mt-2">{success}</p>}
    </form>
   
  );
};
