import { useState } from "react";
import Sidebardoct from "./Sidebardoct";
import Navdoct from "./Navdoct";

const ProfileSettings = () => {
  const [email] = useState("doctor@example.com"); // Email can't be changed
  const [phoneNumber, setPhoneNumber] = useState("0556464526"); // Simulating phone number
  const [password, setPassword] = useState("**********"); // Simulating password with placeholder for hidden password
  const [language, setLanguage] = useState("english"); // Default language is English

  // States for modals
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // States for form inputs inside modals
  const [newPhone, setNewPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  // Handle the saving of changes
  const handleSavePhone = () => {
    setPhoneNumber(newPhone);
    setNewPhone("");
    setShowPhoneModal(false);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // Save the new password
    setPassword(newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(false);
  };

  const handleSaveLanguage = () => {
    setLanguage(selectedLanguage);
    setShowLanguageModal(false);
  };

  return (
    <div>
      <div>
        <Navdoct />
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="min-h-[calc(100vh-3.5rem)]">
          <Sidebardoct className="min-h-[calc(100vh-3.5rem)]" />
        </div>

        {/* Content */}
        <div className="content max-h-[calc(100vh-3.5rem)] flex justify-center items-center h-screen w-full">
          <div className="w-3/4 bg-white shadow-lg rounded-lg p-5">
            <h1 className="text-xl font-bold text-[#013559] mb-5">Profile Settings</h1>
               {/* Email */}
            <div className="mb-4">
              <label className="block font-bold text-[#013559]">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="rounded-lg w-full outline-none"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block font-bold text-[#013559]">Phone Number</label>
              <button
                onClick={() => setShowPhoneModal(true)}
                className="px-4 py-2 text-[#0090CF] rounded hover:text-[#17323f]"
              >
                Change
              </button>
            </div>
            <p>{phoneNumber}</p>
            </div>
            
            {/* Password */}
            <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block font-bold text-[#013559]">Password</label>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-[#0090CF] px-4 py-2 rounded hover:text-[#17323f]"
              >
                Change
              </button>
            </div>
            <p>{password}</p> {/* Display the password */}
            </div>

            {/* Language */}
            <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block font-bold text-[#013559]">Language</label>
              <button
                onClick={() => setShowLanguageModal(true)}
                className="text-[#0090CF] px-4 py-2 rounded hover:text-[#17323f]"
              >
                Change
              </button>
            </div>
            <p>{language === "english" ? "English" : "Français"}</p>
          </div>
          </div>
        </div>
      </div>

      {/* Modal for Phone Change */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-5">
            <h2 className="text-xl font-bold text-[#013559] mb-4">Change Phone Number</h2>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className=" bg-white m-3 border border-[#0090CF] text-[#013559] rounded-lg p-2 w-full focus:outline-none  focus:ring-[#0090CF] shadow-md"
              placeholder="Enter new phone number"
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-[#0090CF] text-white px-4 py-2 rounded hover:bg-[#007AB8]"
                onClick={handleSavePhone}
              >
                Save
              </button>
              <button
                className="border border-[#0090CF] text-[#0090CF] px-4 py-2 rounded hover:bg-gray-100"
                onClick={() => setShowPhoneModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Password Change */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-5">
            <h2 className="text-xl font-bold text-[#013559] mb-4">Change Password</h2>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className=" bg-white border border-[#0090CF] text-[#013559] rounded-lg p-2 w-full focus:outline-none m-3  focus:ring-[#0090CF] shadow-md"
              placeholder="Enter current password"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className=" bg-white border border-[#0090CF] text-[#013559] rounded-lg p-2 w-full focus:outline-none m-3  focus:ring-[#0090CF] shadow-md"
              placeholder="Enter new password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" bg-white border border-[#0090CF] text-[#013559] rounded-lg p-2 w-full focus:outline-none m-3  focus:ring-[#0090CF] shadow-md"
              placeholder="Confirm new password"
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-[#0090CF] text-white px-4 py-2 rounded hover:bg-[#007AB8]"
                onClick={handleSavePassword}
              >
                Save
              </button>
              <button
                className="border border-[#0090CF] text-[#0090CF] px-4 py-2 rounded hover:bg-gray-100"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Language Change */}
      {showLanguageModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-1/2 p-5">
      <h2 className="text-xl font-bold text-[#013559] mb-4">Change Language</h2>
      <div className="mb-4">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className=" bg-white border border-[#0090CF] text-[#013559] rounded-lg p-2 w-full focus:outline-none  focus:ring-[#0090CF] shadow-md"
        >
          <option value="english" className="bg-white text-[#013559]">English</option>
          <option value="french" className="bg-white text-[#013559]">Français</option>
        </select>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="bg-[#0090CF] text-white px-4 py-2 rounded hover:bg-[#007AB8]"
          onClick={handleSaveLanguage}
        >
          Save
        </button>
        <button
          className="border border-[#0090CF] text-[#0090CF] px-4 py-2 rounded hover:bg-gray-100"
          onClick={() => setShowLanguageModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ProfileSettings;