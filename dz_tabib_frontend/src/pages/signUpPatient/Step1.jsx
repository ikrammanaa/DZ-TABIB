import React, { useState } from "react";
import logo from "../../assets/logo.png";
import signupImage from "../../assets/login1.jpg";
import { auth, googleProvider, signInWithPopup } from "../../config/firebaseConfig"; // Import Firebase
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";
export const Step1 = ({ nextStep }) => {

  const navigate = useNavigate();
  // Function to handle logo click and navigate to homepage
  const handleLogoClick = () => {
    navigate("/"); // Navigate to the homepage
  };


  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    if (!isChecked) {
      setError("You must agree to the terms and privacy policy.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      setError("Password must be at least 8 characters long and contain at least one letter and one number.");
      return;
    }

    setError("");
    nextStep(formData);
  };

  const handleFirebaseSuccess = (result) => {
    const user = result.user;
    console.log("Firebase Google Login Success:", user);
    nextStep({
      name: user.displayName,
      email: user.email,
      password: "",
    });
  };

  const handleFirebaseError = (error) => {
    console.log("Firebase Google Login Failed:", error);
    setError("Something went wrong. Please try again.");
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(handleFirebaseSuccess)
      .catch(handleFirebaseError);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-blue2 bg-opacity-10 ">
      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-green bg-opacity-10 shadow-lg relative">
        {/* Logo with onClick event to navigate to home */}
        <img src={logo} alt="DZ-Tabib Logo" className="h-16 absolute top-1 left-1" />

        <h1 className="text-3xl font-extrabold text-bluenuit mb-8">Create an Account</h1>

        {/* Firebase Google Signup Button */}
        {/* <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-6 bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Icon"
            className="h-6 mr-4"
          />
          <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
        </button> */}
        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full max-w-sm bg-white border border-gray-300 rounded-lg py-2 px-5 text-gray-600 hover:bg-gray-100 shadow-sm mb-6"
          aria-label="Log in with Google"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Icon"
            className="w-6 h-6 mr-4"
          />
         Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center w-full max-w-sm my-2">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute mt-2.5 right-1 px-1  text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {passwordVisible ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-500">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">I agree to Terms and Privacy</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green to-blue2 opacity-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Sign up
          </button>
        </form>

        <p className="mt-3 mb-10 text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-customBlue hover:underline">Login</a>
        </p>
      </div>

      {/* Left Section */}
      <div className=" lg:w-1/2 relative">
        <img
          src={signupImage}
          alt="signup Illustration"
          className="absolute top-0 left-0 h-full w-full rounded-none lg:rounded-l-lg"
        />
        <div class="absolute inset-0 "></div>
      </div>
    </div>
  );
};
