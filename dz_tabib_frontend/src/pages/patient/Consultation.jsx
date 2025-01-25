import React, { useState } from "react";
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

export const Consultation = () => {

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

        
       
      </div>
    </div>
  );
};
