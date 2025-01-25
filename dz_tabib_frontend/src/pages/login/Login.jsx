import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig"; // Firebase config file
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import logo from "../../assets/logo.png";
import loginImage from "../../assets/login4.jpg";
import "@fortawesome/fontawesome-free/css/all.css";



export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Get user details
      console.log("Google Login Successful:", user);
      alert(`Welcome, ${user.displayName || "User"}!`);
      navigate("/patient"); // Navigate to dashboard after login
    } catch (error) {
      console.error("Google Login Failed:", error);
      setError("Google login failed. Please try again.");
    }
  };

  
  const handleEmailLogin = async (e) => { // Make this function async
    e.preventDefault();
    setLoading(true);
    setError("");
    navigate("/patient");
    
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-full  lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-blue2 bg-opacity-10 backdrop-blur-md shadow-lg relative ">
        <img src={logo} alt="DZ-Tabib Logo" className="h-16 absolute top-1 left-1" />

        <h1 className="text-3xl font-extrabold text-bluenuit mb-8">
          Welcome Back!
        </h1>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full max-w-sm bg-white border border-gray-300 rounded-lg py-2 px-5 text-gray-600 hover:bg-gray-100 shadow-sm mb-6"
          aria-label="Log in with Google"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Icon"
            className="w-6 h-6 mr-3"
          />
          Log in with Google
        </button>

        <div className="flex items-center w-full max-w-sm my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              aria-label="Email Address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                aria-label="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
               
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }  text-gray-500 hover:text-customBlue`}
                ></i>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-500">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Remember Me</span>
            </label>
            <a
              href="/password"
              className="text-customBlue text-opacity-400  hover:underline text-sm"
              aria-label="Forgot Password"
            >
              Forgot Password?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue to-blue2 opacity-500 text-white py-2 px-4 rounded-lg shadow-md  hover:shadow-lg transition-transform focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in.." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm">
          Not a member yet?{" "}
          <a
            href="/identifier"
            className="text-customBlue text-opacity-400 hover:underline"
            aria-label="Create an Account"
          >
            Create an account
          </a>
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="absolute top-0 left-0 h-full w-full  rounded-none lg:rounded-l-lg"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-blue-500"></div>
      </div>
    </div>
  );
};
