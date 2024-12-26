import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AcceptedSignup = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/dashboardDoctor'); // Redirect to the patient dashboard
  };

  return (
    <div className="bg-blue2 bg-opacity-30 rounded-lg shadow-lg p-6 max-w-md text-center">
        <h2 className="text-2xl font-bold text-bluenuit mb-2">
          Welcome to dz-Tabib dear Doctor..
        </h2>
        <p className="text-gray-600 mb-4">
        Connect with patients effortlessly and manage your appointments anytime, from anywhere. Just press the button below to get started.
        </p>
        <button
          className="bg-gradient-to-r from-blue to-blue2 opacity-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>

      
  );
};
