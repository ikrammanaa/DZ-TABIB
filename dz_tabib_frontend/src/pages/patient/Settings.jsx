import React, { useState, useEffect } from "react";
import { FiPhone, FiMail, FiLock, FiGlobe, FiTrash2 } from "react-icons/fi";


import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaHistory,
  FaStethoscope,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaSpinner,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { doctors } from "./doctors"; 

export const Settings = () => {

const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState(""); // Single search term state
const [isLoading, setIsLoading] = useState(false);
//////
const [activeDoctor, setActiveDoctor] = useState(null); // Tracks the doctor to show in DoctorCard
// Mock patient data (you will replace this with actual data after login)
const patientData = {
  fullName: "Manaa Ikram",
  email: "ikram@example.com",
  role: "Patient",
};


const navigate = useNavigate(); 
///////
/////
 const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
////////////
const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete confirmation modal
const [isPasswordVerified, setIsPasswordVerified] = useState(false);
const [phoneNumber, setPhoneNumber] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [passwordError, setPasswordError] = useState("");
const [language, setLanguage] = useState(""); // Track the current language
const [newPhoneNumber, setNewPhoneNumber] = useState("");
const [newLanguage, setNewLanguage] = useState(language); // Language to be updated
// const [user, setUser] = useState(null); // State to store user data fetched from backend

// useEffect(() => {
//   // Fetch user data from backend when the component is mounted
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch("/api/get-user");
//       const data = await response.json();
//       if (response.ok) {
//         setUser(data); // Set the fetched user data in the state
//         setPhoneNumber(data.phoneNumber); // Set initial phone number
//         setLanguage(data.language); // Set initial language
//       } else {
//         alert("Failed to fetch user data.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       alert("An error occurred while fetching user data.");
//     }
//   };
//   fetchUserData();
// }, []);
const user = {
  id: 1,
  phoneNumber: "05 57 45 11 14",
  email: "b.dahmane@dzin.dv",
  password: "currentPassword123", // Use the actual current password for verification
  language: "English", // or other language options
};

const openPhoneModal = () => {
  setIsPhoneModalOpen(true);
  setNewPhoneNumber(phoneNumber); // Pre-fill the modal with the current phone number
};

const openPasswordModal = () => {
  setIsPasswordModalOpen(true);
  setIsPasswordVerified(false); // Reset the password verification state
  setCurrentPassword(""); // Reset current password input field
  setNewPassword(""); // Reset new password input field
  setPasswordError(""); // Reset password error state
};

const openLanguageModal = () => {
  setIsLanguageModalOpen(true);
};

const openDeleteModal = () => {
  setIsDeleteModalOpen(true); // Open delete confirmation modal
};

const closeModal = () => {
  setIsPhoneModalOpen(false);
  setIsPasswordModalOpen(false);
  setIsLanguageModalOpen(false);
  setIsDeleteModalOpen(false); // Close the delete modal
};

const validatePhoneNumber = (number) => {
  // Regex for local numbers (0X XX XX XX XX) or international (+213 X XX XX XX)
  const regex = /^(0\d{1} \d{2} \d{2} \d{2} \d{2})$|(^\+213 \d{1} \d{2} \d{2} \d{2} \d{2})$/;
  return regex.test(number);
};

const savePhoneNumber = async () => {
  // Validate the new phone number
  if (!validatePhoneNumber(newPhoneNumber)) {
    alert("Please enter a valid Algerian phone number.");
    return;
  }

  // Update the phone number in the frontend state
  setPhoneNumber(newPhoneNumber);

  // Send the new phone number to the backend
  try {
    const response = await fetch("/api/update-phone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: newPhoneNumber }),
    });

    if (response.ok) {
      alert("Phone number updated successfully.");
      closeModal(); // Close the modal after successful update
    } else {
      alert("Failed to update the phone number.");
    }
  } catch (error) {
    console.error("Error updating phone number:", error);
    alert("An error occurred while updating the phone number.");
  }
};

const verifyPassword = () => {
  // Verify if the current password matches the saved password
  if (currentPassword === user.password) {
    setIsPasswordVerified(true);
  } else {
    alert("Incorrect password. Please try again.");
  }
};

const validateNewPassword = (password) => {
  // Password conditions: at least 8 characters, at least 1 uppercase letter, 1 number, and 1 special character
  const minLength = /.{8,}/;
  const uppercase = /[A-Z]/;
  const number = /\d/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (!minLength.test(password)) {
    return "Password must be at least 8 characters long.";
  }
  if (!uppercase.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!number.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!specialChar.test(password)) {
    return "Password must contain at least one special character.";
  }
  return ""; // No error if all conditions are met
};

const savePassword = async () => {
  // Validate new password
  const error = validateNewPassword(newPassword);
  if (error) {
    setPasswordError(error);
    return;
  }

  // Send the new password to the backend
  try {
    const response = await fetch("/api/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (response.ok) {
      alert("Password updated successfully.");
      closeModal(); // Close the modal after successful update
    } else {
      alert("Failed to update the password.");
    }
  } catch (error) {
    console.error("Error updating password:", error);
    alert("An error occurred while updating the password.");
  }
};

const saveLanguage = async () => {
  // Send the new language to the backend
  try {
    const response = await fetch("/api/update-language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: newLanguage }),
    });

    if (response.ok) {
      setLanguage(newLanguage); // Update the language in the frontend state
      alert("Language updated successfully.");
      closeModal(); // Close the modal after successful update
    } else {
      alert("Failed to update the language.");
    }
  } catch (error) {
    console.error("Error updating language:", error);
    alert("An error occurred while updating the language.");
  }
};

const deleteAccount = async () => {
  // Send a request to the backend to delete the account
  try {
    const response = await fetch("/api/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id }),
    });

    if (response.ok) {
      alert("Your account has been deleted successfully.");
      // You can redirect the user to the home page or logout
      window.location.href = "/"; // Redirect to home or logout
    } else {
      alert("Failed to delete the account.");
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    alert("An error occurred while deleting the account.");
  }
};

if (!user) {
  return <div>Loading...</div>; // Show a loading message while the user data is being fetched
}

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-sky-200 shadow-md  flex items-center justify-between fixed w-full top-0 left-0 z-10">
        {/* Logo */}
        <div className="flex items-center">
          <button
            className="text-bluenuit text-2xl md:hidden mr-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <img src={logo} alt="DZ-Tabib Logo" className="h-16 w-30" />
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center w-1/4">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-full border px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the single state
          />
          <FaSearch className="absolute left-3 text-gray-400" />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start bg-sky-200 rounded-md p-4 w-fit cursor-pointer">
          <span className="text-lg font-semibold text-cyan-900">
            {patientData.fullName}
          </span>
          <span className="text-sm text-gray-500">{patientData.role}</span>
          <button
            onClick={handleToggleDropdown}
            className="mt-1 flex items-center text-cyan-900"
          >
            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {/* Dropdown Content */}
{isDropdownOpen && (
  <div className="absolute top-full right-0 bg-white shadow-lg rounded-md p-4 w-72 mt-2 z-10 border border-gray-200">
    <div className="space-y-2">
    <p className="text-sm text-gray-800">
              <strong>Name:</strong> {patientData.fullName}
            </p>
            <p className="text-sm text-gray-800">
              <strong>Email:</strong> {patientData.email}
            </p>
            <p className="text-sm text-gray-800">
              <strong>Role:</strong> {patientData.role}
            </p>
    </div>
    <div className="mt-3 flex justify-between gap-4">
      <button
        onClick={() => alert('Edit Profile')}
        className="w-full py-2 text-sm font-medium text-white bg-gradient-to-r from-blue2 to-blue2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Edit Profile
      </button>
      <button
        onClick={() => alert('Sign Out')}
        className="w-full py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
      >
        Sign Out
      </button>
    </div>
  </div>
)}
      </header>

      <div className="flex h-screen pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed h-full bg-sky-200 text-sky-900 py-6 px-4 shadow-xl transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-20 lg:w-1/6`}
        >
          <ul className="space-y-6 mr-5 mt-20">
            <li
              className="flex items-center space-x-3 hover:bg-blue2 hover:text-white hover:scale-105 hover:shadow-lg p-3 rounded-lg cursor-pointer transition-all md:justify-center"
              title="Dashboard"
            >
              <FaTachometerAlt className="text-xl" />
              <Link to="/patient" className="hidden lg:block text-lg ">
                Dashboard
              </Link>
            </li>
            <li
              className="flex items-center space-x-3 hover:bg-blue2 hover:text-white hover:scale-105 hover:shadow-lg p-3 rounded-lg cursor-pointer transition-all md:justify-center"
              title="Account Info"
            >
              <FaUser className="text-xl" />
              <Link to="/patient/account" className="hidden lg:block text-lg">
                Account Info
              </Link>
            </li>
            <li
              className="flex items-center space-x-3 hover:bg-blue2 hover:text-white hover:scale-105 hover:shadow-lg p-3 rounded-lg cursor-pointer transition-all md:justify-center"
              title="Appointments"
            >
              <FaCalendarAlt className="text-xl" />
              <Link to="/patient/appointments" className="hidden lg:block text-lg">
                Appointments
              </Link>
            </li>
            <li
              className="flex items-center space-x-3 hover:bg-blue2 hover:text-white hover:scale-105 hover:shadow-lg p-3 rounded-lg cursor-pointer transition-all md:justify-center"
              title="Historique"
            >
              <FaHistory className="text-xl" />
              <Link to="/patient/historique" className="hidden lg:block text-lg">
                Historique
              </Link>
            </li>
            <li
              className="flex items-center space-x-3 hover:bg-blue2 hover:text-white hover:scale-105 hover:shadow-lg p-3 rounded-lg cursor-pointer transition-all md:justify-center"
              title="Consultation"
            >
              <FaStethoscope className="text-xl" />
              <Link to="/patient/consultation" className="hidden lg:block text-lg">
                Consultation
              </Link>
            </li>
            <li
              className="flex items-center space-x-3 hover:bg-blue2 hover:text-white hover:scale-105 hover:shadow-lg p-3 rounded-lg cursor-pointer transition-all md:justify-center"
              title="Settings"
            >
              <FaCog className="text-xl" />
              <Link to="/patient/settings" className="hidden lg:block text-lg">
                Settings
              </Link>
            </li>
            <li
              className="flex items-center space-x-3 hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-lg p-3 rounded-lg cursor-pointer transition-all md:justify-center"
              title="Sign Out"
            >
              <FaSignOutAlt className="text-xl" />
              <Link to="/" className="hidden lg:block text-lg">
                Sign Out
              </Link>
            </li>
          </ul>
        </aside>
        {/* Main Content */}
        <main className=" md:ml-20 lg:ml-60 w-full p-6 bg-sky-50 shadow-md p-10 pt-20 space-y-8 overflow-y-auto">
        <div className="bg-sky-50 min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-sky-700 mb-6">My Profile Settings</h1>
      <ul className="space-y-6">
        {/* Phone Number */}
        <li className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center space-x-3">
            <FiPhone className="text-sky-500 text-lg" />
            <span className="text-gray-700 font-medium">Phone number</span>
            <span className="text-gray-600">{phoneNumber}</span>
          </div>
          <div className="flex items-center space-x-4">
           
            <button
              onClick={openPhoneModal}
              className="flex items-center text-sky-500 hover:underline"
            >
              Change <span className="ml-1"></span>
            </button>
          </div>
        </li>

        {/* Email */}
        <li className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center space-x-3">
            <FiMail className="text-sky-500 text-lg" />
            <span className="text-gray-700 font-medium">E-mail</span>
            <span className="text-gray-600">{patientData.email}</span>
          </div>
        
           
            <div className="flex items-center space-x-4">
            <button className="flex items-center text-sky-500 hover:underline">
              Change <span className="ml-1"></span>
            </button>
          </div>
        </li>

        {/* Password */}
        <li className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center space-x-3">
            <FiLock className="text-sky-500 text-lg" />
            <span className="text-gray-700 font-medium">Password</span>
          </div>
          <button
            onClick={openPasswordModal}
            className="flex items-center text-sky-500 hover:underline"
          >
            Change <span className="ml-1"></span>
          </button>
        </li>

        {/* Language */}
        <li className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center space-x-3">
            <FiGlobe className="text-sky-500 text-lg" />
            <span className="text-gray-700 font-medium">Language</span>
            <span className="text-gray-600">{language}</span>
          </div>
        
            
            <div className="flex items-center space-x-4">
            <button
              onClick={openLanguageModal}
              className="flex items-center text-sky-500 hover:underline"
            >
              Change <span className="ml-1"></span>
            </button>
          </div>
        </li>

        {/* Delete Account */}
        <li className="flex justify-between items-center pb-4">
          <button
            onClick={openDeleteModal}
            className="flex items-center text-red-500 hover:underline"
          >
            <FiTrash2 className="text-lg" />
            <span className="ml-2">Delete Account</span>
          </button>
        </li>
      </ul>

      {/* Phone Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-sky-700">Change Phone Number</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖️
              </button>
            </div>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              placeholder="New Phone Number"
            />
            <button
              onClick={savePhoneNumber}
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-sky-700">Change Password</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖️
            </button>
            {!isPasswordVerified ? (
              <>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border rounded p-2 mb-4"
                  placeholder="Current Password"
                />
                <button
                  onClick={verifyPassword}
                  className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
                >
                  Verify Password
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded p-2 mb-4"
                  placeholder="New Password"
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mb-4">{passwordError}</p>
                )}
                <button
                  onClick={savePassword}
                  className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Language Modal */}
      {isLanguageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-sky-700">Change Language</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖️
              </button>
            </div>
            <select
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              {/* Add more languages as needed */}
            </select>
            <button
              onClick={saveLanguage}
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-red-500 mb-4">Are you sure you want to delete your account?</h2>
            <div className="flex justify-between">
              <button
                onClick={deleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </main>
        
       
      </div>
    </div>
  );
};
