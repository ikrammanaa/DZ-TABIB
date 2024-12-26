import React, {  useState, useEffect, useRef  } from "react";
import logo from "../../assets/logo.png";
import singupImag from "../../assets/login1.jpg";
import "leaflet/dist/leaflet.css";

export const Step3 = ({ nextStep }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthday: "",
    phone: "+213",  // Set default phone to +213
    gender: "",
    wilaya_id: "",
  });

  // City-related states
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
//////////////////////////////////////
// Fetch city suggestions from API
const fetchSuggestions = async (query) => {
  if (!query) {
    setSuggestions([]);
    return;
  }

  try {
    const response = await fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`);
    const data = await response.json();
    if (data.features) {
      setSuggestions(
        data.features.map((feature) => ({
          name: feature.properties.name,
          lat: feature.geometry.coordinates[1],
          lon: feature.geometry.coordinates[0],
        }))
      );
    }
  } catch (err) {
    console.error("Error fetching suggestions:", err);
  }
};

// Handle city input change
const handleCityChange = (e) => {
  const value = e.target.value;
  setCity(value);
  fetchSuggestions(value);
};

// Handle city suggestion selection
const handleSuggestionClick = (suggestion) => {
  setCity(suggestion.name);
  updateMap(suggestion.lat, suggestion.lon);
  setSuggestions([]); // Clear suggestions after selection
  setError("");
};

// Handle map update on city selection
const updateMap = (lat, lon) => {
  setLatitude(lat);
  setLongitude(lon);
};
//////////////////////////////////

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure the phone number always starts with +213
    if (name === "phone" && !value.startsWith("+213")) {
      setFormData({ ...formData, [name]: "+213" + value.replace("+213", "") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+213\d{9}$/.test(formData.phone)) {  // Ensure the phone is valid
      newErrors.phone = "Phone number must be in the format +213XXXXXXXX";
    }
    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!formData.wilaya_id) newErrors.wilaya_id = "Please select a wilaya";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      nextStep();  // Move to the next step (Step 4)
    }
  };

  const wilayas = [
    { id: 1, name: "Adrar" },
    { id: 2, name: "Chlef" },
    { id: 3, name: "Laghouat" },
    { id: 4, name: "Oum El Bouaghi" },
    { id: 5, name: "Batna" },
    { id: 6, name: "Béjaïa" },
    { id: 7, name: "Biskra" },
    { id: 8, name: "Béchar" },
    { id: 9, name: "Blida" },
    { id: 10, name: "Bouira" },
    { id: 11, name: "Tamanrasset" },
    { id: 12, name: "Tébessa" },
    { id: 13, name: "Tlemcen" },
    { id: 14, name: "Tiaret" },
    { id: 15, name: "Tizi Ouzou" },
    { id: 16, name: "Alger" },
    { id: 17, name: "Djelfa" },
    { id: 18, name: "Jijel" },
    { id: 19, name: "Sétif" },
    { id: 20, name: "Saïda" },
    { id: 21, name: "Skikda" },
    { id: 22, name: "Sidi Bel Abbès" },
    { id: 23, name: "Annaba" },
    { id: 24, name: "Guelma" },
    { id: 25, name: "Constantine" },
    { id: 26, name: "Médéa" },
    { id: 27, name: "Mostaganem" },
    { id: 28, name: "M'Sila" },
    { id: 29, name: "Mascara" },
    { id: 30, name: "Ouargla" },
    { id: 31, name: "Oran" },
    { id: 32, name: "El Bayadh" },
    { id: 33, name: "Illizi" },
    { id: 34, name: "Bordj Bou Arréridj" },
    { id: 35, name: "Boumerdès" },
    { id: 36, name: "El Tarf" },
    { id: 37, name: "Tindouf" },
    { id: 38, name: "Tissemsilt" },
    { id: 39, name: "El Oued" },
    { id: 40, name: "Khenchela" },
    { id: 41, name: "Souk Ahras" },
    { id: 42, name: "Tipaza" },
    { id: 43, name: "Mila" },
    { id: 44, name: "Aïn Defla" },
    { id: 45, name: "Naâma" },
    { id: 46, name: "Aïn Témouchent" },
    { id: 47, name: "Ghardaïa" },
    { id: 48, name: "Relizane" },
    { id: 49, name: "Timimoun" },
    { id: 50, name: "Bordj Badji Mokhtar" },
    { id: 51, name: "Ouled Djellal" },
    { id: 52, name: "Béni Abbès" },
    { id: 53, name: "In Salah" },
    { id: 54, name: "In Guezzam" },
    { id: 55, name: "Touggourt" },
    { id: 56, name: "Djanet" },
    { id: 57, name: "El M'Ghair" },
    { id: 58, name: "El Meniaa" },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-blue2 bg-opacity-10">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 bg-green bg-opacity-10 shadow-lg relative">
        <img src={logo} alt="DZ-Tabib Logo" className="h-16 absolute top-1 left-1" />

        <h1 className="text-3xl font-extrabold text-bluenuit mb-9">
          Enter your personal information
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type your name"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="surname">
                Surname
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Type your surname"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.surname ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full bg-blue2  bg-opacity-20 p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="birthday">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.birthday ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="phone">
              Phone number
            </label>
            <div className="flex  bg-white items-center border rounded-lg p-3">
              <span className="text-xl mr-2">🇩🇿</span> 
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Type your phone number"
                className={`w-full p-1/2 border-none focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Wilaya Section */}
          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="wilaya_id">
              Wilaya
            </label>
            <select
              id="wilaya_id"
              name="wilaya_id"
              value={formData.wilaya_id}
              onChange={handleChange}
              className={`w-full bg-blue2 bg-opacity-20 p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.wilaya_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a Wilaya</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.id} value={wilaya.id}>
                  {wilaya.name}
                </option>
              ))}
            </select>
            {errors.wilaya_id && <p className="text-red-500 text-sm mt-1">{errors.wilaya_id}</p>}
          </div>
          <div>
              <label className="block text-gray-700 text-sm mb-2">
                Location
              </label>
              {/* <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Select your position"
                className="mt-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )} */}
              <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Street,City"
            required
            className=" w-full  p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {suggestions.length > 0 && (
            <ul className="border bg-white rounded-md mt-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
            </div>

           {/* ///////////city endes///////////// */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green to-blue2 opacity-500 text-white py-3 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className=" lg:w-1/2 relative">
        <img
          src={singupImag}
          alt="Login Illustration"
          className="absolute top-0 left-0 h-full w-full rounded-none lg:rounded-l-lg"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-blue-500"></div>
      </div>
    </div>
  );
};
