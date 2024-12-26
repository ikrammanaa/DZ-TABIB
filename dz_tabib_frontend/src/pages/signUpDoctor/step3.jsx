import React, { useState, useEffect, useRef } from "react";
import login from "../../assets/signupd.jpg";
import Tesseract from "tesseract.js";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

/////1
// Specialties List
const specialties = [
  "Cardiology", "Dermatology", "Pediatrics", "Radiology", "Neurology",
  "Psychiatry", "Oncology", "General Medicine", "Orthopedics", "Endocrinology",
  "Gastroenterology", "Hematology", "Immunology", "Infectious Diseases", 
  "Plastic Surgery", "Reproductive Medicine", "Rheumatology", "Urology", 
  "Anesthesiology", "Ophthalmology"
];

export const step3 = ({ nextStep }) => {
  // State variables
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "+213", gender: "",
    birthday: "", wilaya: "", speciality: "", reason: "", termsAccepted: false,
    certifications: null, diplomaText: "", // Text extracted from OCR
  });
  const [errors, setErrors] = useState({});
  const [ocrLoading, setOcrLoading] = useState(false); // For OCR loading state

  // City-related states
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Specialty-related states
  const [query, setQuery] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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

  // Handle specialty input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = specialties.filter((specialty) =>
        specialty.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSpecialties(filtered);
      setIsDropdownVisible(true);
    } else {
      setFilteredSpecialties([]);
      setIsDropdownVisible(false);
    }
  };

  // Handle specialty selection
  const handleSelectSpecialty = (specialty) => {
    setQuery(specialty);
    setFormData((prev) => ({ ...prev, speciality: specialty }));
    setIsDropdownVisible(false);
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "phone" && !value.startsWith("+213")) {
      setFormData({ ...formData, [name]: "+213" + value.replace("+213", "") });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
      });
    }

    if (name === "certifications" && files[0]) {
      handleOCR(files[0]); // Trigger OCR for certifications
    }
  };

  // OCR processing
  const handleOCR = (file) => {
    setOcrLoading(true);
    Tesseract.recognize(file, "eng")
      .then(({ data: { text } }) => {
        setFormData((prev) => ({ ...prev, diplomaText: text }));
        setOcrLoading(false);
      
      })
      
      .catch((error) => {
        console.error("OCR error:", error);
        setOcrLoading(false);
      });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+213\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be in the format +213XXXXXXXX";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.wilaya) newErrors.wilaya = "Wilaya is required";
    if (!formData.speciality) newErrors.speciality = "Speciality is required";
    if (!formData.reason) newErrors.reason = "Reason is required";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms";
    if (!formData.certifications) newErrors.certifications = "You must add your diploma";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    nextStep(); 
  if (validate()) {
    nextStep();  // Proceed to next step
  } 
};


  
    // // Submit city data to backend
    // setIsSubmitting(true);
    // if (!latitude || !longitude) {
    //   setError("Please select a valid city.");
    //   setIsSubmitting(false);
    //   return;
    // }

  //   const submissionData = { 
  //   firstName: formData.firstName,
  //   lastName: formData.lastName,
  //   email: formData.email,
  //   phone: formData.phone,
  //   gender: formData.gender,
  //   birthday: formData.birthday,
  //   wilaya: formData.wilaya,
  //   speciality: formData.speciality,
  //   reason: formData.reason,
  //   diplomaText: formData.diplomaText,  // Sending the OCR result
  //   termsAccepted: formData.termsAccepted,
  //   latitude: latitude,
  //   longitude: longitude,
  //    };

  //   try {
  //     const response = await fetch("https://url.com/api/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(submissionData),
  //     });

  //     if (response.ok) {
  //       alert("Signup successful!");
  //     } else {
  //       alert("Signup failed! Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
 
  
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
  const navigate = useNavigate();
// Function to handle logo click and navigate to homepage
const handleLogoClick = () => {
  navigate("/"); // Navigate to the homepage
};
  return (
    <div className="bg-blue2 bg-opacity-30  pb-20" >
      {/* Top Half Background Image */}
      <div
        className="h-[70vh]  bg-cover bg-center flex  justify-center"
        style={{ backgroundImage: `url(${login})` }}
      >
        <img
        src={logo}
        alt="DZ-Tabib Logo"
        className="h-16 absolute top-0 left-2 cursor-pointer
        transition-transform duration-300 hover:scale-110"
        onClick={handleLogoClick} // Add onClick handler to navigate to homepage
      />
        <h2 className="text-6xl text-bluenuit  font-bold mt-10 pt-10" style={{ textShadow: "2px 2px 4px white" }} >Join Our Doctors</h2>
      </div>

      {/* Bottom White Section */}
      <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden -mt-80  "
      >
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* /////////name section////////// */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="mt-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            {/* ///////////////name section end///////////// */}
            {/* ///////////////last name start//////////// */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="mt-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
            {/* //////////////////last name ends///////////// */}

           {/* /////////////////email start/////////////// */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
             </div>
             {/* ////////////eemail ends/////////////// */}

             {/* //////////////phone numbeer start///////////// */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              
              <div className="flex  bg-white items-center border rounded-lg p-1.5">
              <span className="text-xl mr-2">🇩🇿</span> 
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={` mt-1/2 border rounded-lg  w-full border-none focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            {/* ///////////phone number eends///////////// */}
            {/* ///////////////gender starts//////////////// */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1  bg-blue bg-opacity-20 border rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>
            {/* /////////////////gender/////////////// */}
            {/* ///////////////////birthday//////////// */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="mt-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.birthday && (
                <p className="text-red-500 text-sm">{errors.birthday}</p>
              )}
            </div>
            {/* /////////////////////birthday/////////////////// */}
          
            {/*////////////////// Wilaya Section starts//////////////// */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="wilaya_id">
            Wilaya
            </label>
            <select
              id="wilaya_id"
              name="wilaya_id"
              value={formData.wilaya_id}
              onChange={handleChange}
              className={`mt-1 bg-blue bg-opacity-20 border rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
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
          {/* //////////////wilaya seection eends///////////////// */}
          {/* ///////////////////////city strats //////////// */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
            className=" mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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


          </div>

          
          {/* ////////////speciality section starts///////////////// */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Speciality
            </label>
            {/* <textarea
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              placeholder="Type a short descriptive about your speciality..."
              className="mt-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea> */}
            <div className="relative ">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="mt-1 w-full border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type specialty"
      />
      {isDropdownVisible && filteredSpecialties.length > 0 && (
        <div
        ref={dropdownRef}
        className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
      >
        {filteredSpecialties.map((specialty, index) => (
          <div
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-blue hover:bg-opacity-20"
            onClick={() => handleSelectSpecialty(specialty)} // Select specialty on click
          >
              {specialty}
            </div>
          ))}
        </div>
      )}
    </div>
            {errors.speciality && (
              <p className="text-red-500 text-sm">{errors.speciality}</p>
            )}
            
          </div>



    {/* //////////////////// speciality seection ends////////////////*/}


          {/* //////////////////reson section starts////////////////// */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Why do you want to join Tabib Dz?
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Type your message..."
              className="mt-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason}</p>
            )}
          </div>
          {/* ////////////////reason section ends////////////////// */}


          {/* /////////////////// diploma section starts ////////////*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Import your medical diploma
            </label>
            <input
              type="file"
              name="certifications"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-10 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue file:bg-opacity-20 file:text-gray-20 hover:file:bg-gray-200"
            />
            {errors.certifications && (
              <p className="text-red-500 text-sm">{errors.certifications}</p>
            )}
            {ocrLoading && <p className="text-blue-500 text-sm mt-2">Processing image.</p>}
            {/* {formData.diplomaText && (
              <textarea
                readOnly
                value={formData.diplomaText}
                className="mt-2 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              ></textarea>
            )} */}
          </div>
          {/* //////////////diploma section eends/////////////////////// */}

    {/* ///////////////////terms and pravicy/////////// */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the terms
            </label>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
            )}
          </div>
          {/* //////////////////terms eneds///////////////// */}


          <button
          
            type="submit"
            className=" bg-gradient-to-r from-blue2 to-blue opacity-100 text-white py-3 px-20 ml-60 rounded-lg hover:bg-blue-700 transition duration-200"
          >
           
           Send
          </button>
        </form>
      </div>
    </div>
  );
};
