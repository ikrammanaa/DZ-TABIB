import React, { useState } from "react";
import logo from "../../assets/logo.png";
import singupImag from "../../assets/login1.jpg";
import card from "../../assets/cardsignup.png";
import Tesseract from "tesseract.js"; // Importing Tesseract.js

export const Step4 = ({ nextStep }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(""); // State for storing OCR result
  const [error, setError] = useState(""); // State for error messages

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setError("");
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!selectedFile) {
      setError("Please upload a file before submitting.");
      return;
    }

    // Use Tesseract.js to extract text from the image
    Tesseract.recognize(
      selectedFile,  // The uploaded image
      "eng",         // Language for OCR (English in this case)
      {
        logger: (m) => console.log(m), // Optional: log progress
      }
    ).then(({ data: { text } }) => {
      setOcrResult(text); // Set the extracted text in the state
      console.log("OCR Result:", text); // Log the extracted text to the console

      // Pass file data to the next step
      nextStep(selectedFile);
    }).catch((err) => {
      setError("Error extracting text from image.");
      console.error("OCR Error:", err);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-blue2 bg-opacity-10">
      {/* Left Section: File Upload */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-green bg-opacity-10 shadow-lg relative">
      <img src={logo} alt="DZ-Tabib Logo" className="h-16 absolute top-1 left-1" />
        <h1 className="text-3xl font-extrabold text-bluenuit mb-5">
          Import your identity card
        </h1>
        <p className="text-gray-600">
          Please import your national card back to check your identity number.
        </p>

        <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden mb-20 mt-10">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded Preview"
              className="w-full h-60 object-cover"
            />
          ) : (
            <img
              src={card}
              alt="Placeholder"
              className="w-full h-60 object-cover"
            />
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* OCR Result */}
        {ocrResult && (
          <div className="mt-5">
            <h2 className="text-lg font-bold">Extracted Text:</h2>
            <p>{ocrResult}</p> {/* Display the OCR extracted text */}
          </div>
        )}

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex gap-4">
          <label
            htmlFor="fileInput"
            className=" mr-5 px-10 py-3 text-center bg-gradient-to-r from-blue2 to-green opacity-500 hover:bg-gray-300 hover:scale-105 hover:shadow-lg text-white rounded-lg cursor-pointer"
          >
            Import
          </label>
          <button
            onClick={handleSubmit}
            className=" px-10 py-3 bg-gradient-to-r from-green to-blue2 opacity-500 text-white rounded-lg hover:scale-105 hover:shadow-lg transition-transform text-sm"
          >
            Send
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src={singupImag}
          alt="Login Illustration"
          className="absolute top-0 left-0 h-full w-full rounded-none lg:rounded-l-lg"
        />
        <div className="absolute top-0 left-0 h-full w-full"></div>
      </div>
    </div>
  );
};
