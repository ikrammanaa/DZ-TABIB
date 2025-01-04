import { useState } from "react";

const Forrm = () => {
  // State for each form field
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    topic: "",
    message: "",
    termsAccepted: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox as well
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // Show popup after submission
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold m-10" style={{ color: "#013559" }}>
          Contact Us
        </h1>
        <p className="text-center">You may contact us for any question or problem</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="m-32 mt-16">
          <div className="h-20 flex justify-around gap-10">
            <div className="flex flex-col">
              <label htmlFor="first-name">First name</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last-name">Last name</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
          </div>

          <div className="h-20 flex justify-around gap-10 mt-10">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="outline-none w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone-number">Phone number</label>
              <input
                type="phone"
                id="phone-number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="outline-none w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
          </div>

          <div className="select flex flex-col m-10 mt-10">
            <label htmlFor="medical-specialties">Choose a topic</label>
            <select
              id="medical-specialties"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="outline-none h-12 p-2 rounded-lg border border-[#0090CF] w-full focus:outline-none focus:ring-[#0090CF]"
              required
            >
              <option value="">Select one ...</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Oncology">Oncology</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="General Surgery">General Surgery</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>

          <div className="mssg flex flex-col m-10 ">
            <label htmlFor="message">Message</label>
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message ..."
              className="outline-none w-full h-40 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
              required
            />
          </div>

          <div className=" flex ml-20 gap-5 ">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            /> I accept the terms
          </div>

          <div className=" m-5 w-full flex justify-center items-center">
            <button
              type="submit"
              className="w-80 py-3 mr-20 bg-[#0090CF] text-white rounded-lg hover:bg-[#007bb5]"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Popup with dynamic content */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg w-80 text-center">
            <h2 className="font-bold text-xl mb-3">Thank you for contacting us!</h2>
            <p>An email response will be sent as soon as possible. </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 bg-[#0090CF] text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forrm;
