import React, { useState, useEffect } from "react";
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

export const Historique = () => {

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
////////
const [appointments, setAppointments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      // Replace with your actual backend URL
      const response = await fetch("https://your-backend-api.com/api/appointments");

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      
      // Add logic to classify appointments as past or upcoming
      const currentDate = new Date(); // Get the current date
      
      const categorizedAppointments = data.map(appointment => {
        const appointmentDate = new Date(appointment.date); // Convert appointment date string to Date object
        const isPast = appointmentDate < currentDate; // Check if the appointment is in the past
        return { ...appointment, isPast }; // Add 'isPast' field to each appointment
      });
      
      setAppointments(categorizedAppointments); // Set appointments data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError(error.message); // Handle any errors
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  fetchAppointments(); // Call the function when the component mounts
}, []);


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
        <main className=" md:ml-20 lg:ml-60 w-full bg-sky-50 shadow-md p-10 pt-20 space-y-8 overflow-y-auto">
<div className="min-h-screen bg-sky-50 p-8">
      {loading ? (
        <div className="text-center text-sky-700">Loading appointments...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : appointments.length === 0 ? (
        <div className="text-center text-gray-700">
          <p className="text-lg font-semibold">
            You do not have any past appointments!
          </p>
          <a href="#" className="text-sky-500 hover:underline">
            Go ahead and take one...
          </a>
        </div>
      ) : (
        <div>
          <h2 className="text-xl text-sky-600 font-semibold mb-4">My past appointments</h2>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`border-b border-gray-200 py-4 flex justify-between items-start ${
                appointment.isPast ? "bg-gray-100" : "bg-green-100" // Highlight past appointments differently
              }`}
            >
              <div>
                <p>
                  <span className="text-sky-800 font-bold">Doctor: </span>
                  {appointment.doctor}
                </p>
                <p>
                  <span className="text-sky-800 font-bold">Speciality: </span>
                  {appointment.speciality}
                </p>
                <p>
                  <span className="text-sky-800 font-bold">Date: </span>
                  {appointment.date}
                </p>
                <p>
                  <span className="text-sky-800 font-bold">Time: </span>
                  {appointment.time}
                </p>
                <p>
                  <span className="text-sky-800 font-bold">Report: </span>
                  {appointment.report}
                </p>
              </div>
              {/* Doctor Profile Link with ID */}
              <Link
                to={`/doctor/${appointment.id}`} // Use the doctor's ID here
                className="text-sky-500 hover:underline text-sm font-semibold"
              >
                Doctor profile &gt;
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>



</main>
        
       
      </div>
    </div>
  );
};
