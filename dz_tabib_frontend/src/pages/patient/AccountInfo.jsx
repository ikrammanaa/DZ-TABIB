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
import "leaflet/dist/leaflet.css";
export const AccountInfo = () => {

const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState(""); // Single search term state
const [isLoading, setIsLoading] = useState(false);
//////
const [activeDoctor, setActiveDoctor] = useState(null); // Tracks the doctor to show in DoctorCard
// Mock patient data (you will replace this with actual data after login)



const navigate = useNavigate(); 
///////
/////
 const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const initialPatientData = {
    fullName: "Manaa Ikram",
  email: "ikram@example.com",
  role: "Patient",
    name: "Ikram",
    surname: "Zouari",
    birthday: "1990-06-15",
    phone: "+213123456789",
    gender: "Female",
    wilaya: "Algiers", // Replace with actual wilaya name from your data
    location: "El Harrach, Algiers", // Replace with actual city or location
  };
  const [patientData, setPatientData] = useState(initialPatientData);

  const [isEditing, setIsEditing] = useState(false);

  // Function to handle the update of the patient data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle between edit and view modes
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
////////////////////////////
// const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState(""); 
//   const [isLoading, setIsLoading] = useState(true); // Start by assuming loading
//   const [patientData, setPatientData] = useState(null); // Initially set to null to handle loading state
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate(); 

//   const handleToggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   // Fetch the user data when the component mounts
//   useEffect(() => {
//     const fetchPatientData = async () => {
//       setIsLoading(true); // Set loading to true before the API call
//       try {
//         const response = await fetch("/api/patient"); // Replace with your actual API endpoint
//         if (response.ok) {
//           const data = await response.json();
//           setPatientData(data); // Set the fetched data to state
//         } else {
//           console.error("Failed to fetch patient data");
//         }
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//       } finally {
//         setIsLoading(false); // Set loading to false after the API call completes
//       }
//     };

//     fetchPatientData();
//   }, []);

//   // Handle changes to the patient data fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Toggle between edit and view modes
//   const toggleEdit = () => {
//     setIsEditing((prev) => !prev);
//   };

//   // Show loading spinner while data is being fetched
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <FaSpinner className="animate-spin text-4xl text-blue-500" />
//       </div>
//     );
//   }

//   if (!patientData) {
//     return <div>Error loading patient data</div>;
//   }

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
        <main className=" md:ml-20 lg:ml-60 w-full bg-blue2 bg-opacity-10 shadow-md p-10 pt-20 space-y-8 overflow-y-auto">
        {/* Filters */}
        <h1 className="text-3xl font-extrabold text-sky-600 mb-9">Your Account Information</h1>

<div className="space-y-6">
  {/* Name and Surname */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-800 text-sm mb-2" htmlFor="name">
        Name
      </label>
      <div className="w-full p-3 border rounded-lg bg-white">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={patientData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        ) : (
          patientData.name
        )}
      </div>
    </div>

    <div>
      <label className="block text-gray-800 text-sm mb-2" htmlFor="surname">
        Surname
      </label>
      <div className="w-full p-3 border rounded-lg bg-white">
        {isEditing ? (
          <input
            type="text"
            name="surname"
            value={patientData.surname}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        ) : (
          patientData.surname
        )}
      </div>
    </div>
  </div>

  {/* Gender and Birthday */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-gray-800 text-sm mb-2" htmlFor="gender">
        Gender
      </label>
      <div className="w-full p-3 border rounded-lg bg-white">
        {isEditing ? (
          <input
            type="text"
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        ) : (
          patientData.gender
        )}
      </div>
    </div>

    <div>
      <label className="block text-gray-800 text-sm mb-2" htmlFor="birthday">
        Birthday
      </label>
      <div className="w-full p-3 border rounded-lg bg-white">
        {isEditing ? (
          <input
            type="date"
            name="birthday"
            value={patientData.birthday}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        ) : (
          patientData.birthday
        )}
      </div>
    </div>
  </div>

  {/* Phone, Wilaya, and Location */}
  <div>
    <label className="block text-gray-800 text-sm mb-2" htmlFor="phone">
      Phone number
    </label>
    <div className="w-full p-3 border rounded-lg bg-white">
      {isEditing ? (
        <input
          type="text"
          name="phone"
          value={patientData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      ) : (
        patientData.phone
      )}
    </div>
  </div>

  <div>
    <label className="block text-gray-800 text-sm mb-2" htmlFor="wilaya">
      Wilaya
    </label>
    <div className="w-full p-3 border rounded-lg bg-white">
      {isEditing ? (
        <input
          type="text"
          name="wilaya"
          value={patientData.wilaya}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      ) : (
        patientData.wilaya
      )}
    </div>
  </div>

  <div>
    <label className="block text-gray-800 text-sm mb-2" htmlFor="location">
      Location
    </label>
    <div className="w-full p-3 border rounded-lg bg-white">
      {isEditing ? (
        <input
          type="text"
          name="location"
          value={patientData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      ) : (
        patientData.location
      )}
    </div>
  </div>

  {/* Modify Button */}
  <div className="mt-6">
    <button
      onClick={toggleEdit}
      className="px-6 py-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500"
    >
      {isEditing ? "Save Changes" : "Modify Profile"}
    </button>
  </div>
</div>
       </main> 
       
      </div>
    </div>
  );
};
