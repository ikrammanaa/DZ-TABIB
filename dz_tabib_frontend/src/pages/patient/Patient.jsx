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
  FaUserAlt,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import { doctors } from "./doctors"; 
import { DoctorCard } from "./DoctorCard";
export const Patient = () => {

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
const handleViewProfile = (doctorId) => {
  navigate(`/doctor/${doctorId}`); // Redirect to the doctor's profile
};

const handleViewCard = (doctor) => {
  setActiveDoctor(doctor); // Set the active doctor to display in DoctorCard
};
/////////
 const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

// Filter doctors based on search parameters
const filteredDoctors = doctors.filter((doctor) => {
  return (
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    
    doctor.insurance.some((ins) => ins.toLowerCase().includes(searchTerm.toLowerCase()))
  );
});

////

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSignOut = () => {
    // Clear authentication data (adjust according to your method)
    localStorage.removeItem("authToken"); // Or sessionStorage.removeItem("authToken")
    // Redirect to the home page or login page
    navigate("/"); // Redirect to home or login page
  };

  const toggleModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Simulate data fetching or call your API
      setTimeout(() => {
        setIsLoading(false);
        if (filteredDoctors.length === 1) {
          navigate(`/doctor/${filteredDoctors[0].id}`);
        }
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong, please try again.");
    }
  };
  

  return (
    <div className="h-screen flex flex-col md:flex-row sm:flex-col">
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
        onClick={toggleModal} // Show the confirmation modal
      >
        <FaSignOutAlt className="text-xl" />
        <span className="hidden lg:block text-lg">Sign Out</span>
      </li>

      
          </ul>
        </aside>
        {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <button
              onClick={toggleModal} // Close the modal without doing anything
              className="text-sky-600 hover:text-sky-800 float-right"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-sky-700">
              Are you sure you want to log out, {patientData.fullName}?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleSignOut} // Proceed with sign out
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-sky-600"
              >
                 Log Out
              </button>
              <button
                onClick={toggleModal} // Close the modal without logging out
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        {/* Main Content */}
        <main className=" md:ml-20 lg:ml-60 w-full bg-blue2 bg-opacity-10 shadow-md p-10 pt-20 space-y-8 overflow-y-auto">
         {/* Filters */}
<div className="flex flex-wrap items-center gap-4 rounded-lg">
  <div className="relative flex-1">
    <input
      type="text"
      placeholder="Name, specialty, establishment,..."
      className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-lg"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
    />
    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue2">
      <FaSearch />
    </span>
  </div>

  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="flex items-center gap-2 bg-gradient-to-l from-blue2 to-blue2 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
  >
    {isLoading ? (
      <FaSpinner className="animate-spin" />
    ) : (
      <span>Search</span>
    )}
  </button>
</div>

{/* Display "No Results Found" if no filtered results */}
{filteredDoctors.length === 0 && searchTerm !== "" && (
  <p className="text-red-500 mt-4">No results found. Try a different search term.</p>
)}


           <div className="space-y-6">
      {filteredDoctors.map((doctor, idx) => (
        <div
          key={idx}
          className="bg-blue2 bg-opacity-60 shadow-lg rounded-lg p-5 flex items-center space-x-6 hover:shadow-xl transition duration-300"
        >
          {activeDoctor?.id === doctor.id ? (
            <DoctorCard doctor={doctor} /> // Render DoctorCard if active
          ) : (
            <>
              <img
                src={doctor.img || "https://via.placeholder.com/80"}
                alt="Doctor"
                className="rounded-full w-20 h-20"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-900">
                  {doctor.specialization} - {doctor.location}
                </p>
                <p className="text-sm text-gray-600">{doctor.description}</p>
                <p className="text-sm text-gray-800">
                  Insurance: {doctor.insurance.join(", ")}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
              <button
  className="text-sky-900 text-lg px-1 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-1"
  onClick={() => handleViewProfile(doctor.id)} // Handle profile navigation
>
  <FaUserAlt className="text-lg" /> {/* Icon */}
  <span>View Profile</span> {/* Button text */}
</button>
<button
  className="text-white  text-lg px-1 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-1"
  onClick={() => handleViewCard(doctor)} // Handle card replacement
>
  <FaCalendarAlt className="text-lg" /> {/* Icon */}
  <span>Appointment</span> {/* Button text */}
</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
        </main>
      </div>
    </div>
  );
};
