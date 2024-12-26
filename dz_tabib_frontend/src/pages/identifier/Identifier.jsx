// import login from "../../assets/login1.png";
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// export const Identifier = () => {
//   const navigate = useNavigate();
//   return( 
//     <div
//     className="h-screen bg-cover bg-center flex flex-col justify-center items-center"
//     style={{ backgroundImage: `url(${login})` }}
//   >

//     <div className="bg-blue2 bg-opacity-20 text-center p-40 rounded-lg">
//       <h1 className="text-bluenuit text-5xl font-bold mb-10">
//         Identify Yourself
//       </h1>
//       <p className="text-bluenuit text-lg mb-10">
//          choose whether you're singin in as a Doctor or Patient.
//       </p>
//       <div className="flex space-x-8 justify-center items-center  ">
//         <button
//           onClick={() => navigate('/signUpDoctor')}
//           className="px-8 py-3 bg-blue text-white rounded-lg hover:bg-bluenuit"
//         >
//           Doctor
//         </button>
//         <button
//           onClick={() => navigate('/signUpPatient')}
//           className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
//         >
//           Patient
//         </button>
//       </div>
//     </div> 
    
    
//   </div>



//   );
// };

import login from "../../assets/identifier1.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
export const Identifier = () => {
  const navigate = useNavigate();


  // Function to handle logo click and navigate to homepage
  const handleLogoClick = () => {
    navigate("/"); // Navigate to the homepage
  };
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${login})` }}
    >


      {/* Logo with onClick event to navigate to home */}
      <img
        src={logo}
        alt="DZ-Tabib Logo"
        className="h-16 absolute top-0 left-2 cursor-pointer
        transition-transform duration-300 hover:scale-110"
        onClick={handleLogoClick} // Add onClick handler to navigate to homepage
      />


      <div className=" bg-green bg-opacity-20 text-center pb-40 pt-40 pl-40 pr-40 rounded-2xl shadow-lg backdrop-blur-md">
        <h1 className="text-bluenuit text-5xl font-extrabold mb-7">
          Identify Yourself
        </h1>
        <p className="text-gray bg-shadow-20 text-lg mb-10 ">
          Choose whether you're signing in as a <span className="text-blue font-semibold">Doctor</span> or <span className="text-green font-semibold">Patient</span>.
        </p>
        <div className="flex space-x-8 justify-center">
          <button
            onClick={() => navigate("/signUpDoctor")}
            className="px-10 py-4 bg-gradient-to-r from-customBlue to-blue opacity-500 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform"
          >
            Doctor
          </button>
          <button
            onClick={() => navigate("/signUpPatient")}
            className="px-10 py-4 bg-gradient-to-r from-green to-blue2 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform"
          >
            Patient
          </button>
        </div>
      </div>
    </div>
  );
};
