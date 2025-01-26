import { useState, useEffect } from "react";
import Sidebardoct from "./Sidebardoct";
import Navdoct from "./Navdoct";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// List of wilayas
const wilayas = [
  "Alger", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Tlemcen", "Sétif", 
  "Chlef", "Tiaret", "Béjaïa", "Biskra", "Medea", "Skikda", "Tizi Ouzou", "Laghouat", 
  "Mascara", "Saïda", "El Oued", "Khenchela", "Aïn Defla", "El Tarf", "Béchar", 
  "Ghardaïa", "Tipaza", "Relizane", "Bordj Bou Arréridj", "M'sila", "Souk Ahras", 
  "Tamanrasset", "Ouargla", "Kirkara", "El Bayadh", "Illizi","Bouira"
];

const Editprofile = () => {
  // State to hold doctor's information
  const [doctor, setDoctor] = useState({
    name: "Dr. Dahmane Bushra",
    specialization: "Cardiologue",
    location: "Alger", // Wilaya
    gender: "Male",
    age: 40,
    experience: "10 ans expérience ",
    clinicAddress: "123 Health Street, Alger",
    email: "clinic1@clinic.com",
    phone: "05 55 66 78 99",
    insurances: ["CNAS", "CASH", "Assurance Privée"],
    workingHours: { daily: "8 heures", weekly: "5 jours" },
  });

  const [image, setImage] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 36.75, lon: 3.06 }); // Default location (Alger)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save logic here, e.g., send data to the backend
    console.log("Updated Doctor Info:", doctor);
  };

  // Fetch coordinates for the selected Wilaya (just for demo purposes, mapping wilayas to lat/lon)
  const fetchCoordinatesForWilaya = (wilaya) => {
    const coordinatesMap = {
        "Bouira": { "lat": 36.37, "lon": 3.90 },
    "Alger": { "lat": 36.75, "lon": 3.06 },
  "Oran": { "lat": 35.7, "lon": -0.63 },
  "Constantine": { "lat": 36.37, "lon": 6.61 },
  "Annaba": { "lat": 36.87, "lon": 7.76 },
  "Blida": { "lat": 36.48, "lon": 2.87 },
  "Batna": { "lat": 35.55, "lon": 6.17 },
  "Tlemcen": { "lat": 34.88, "lon": -1.32 },
  "Sétif": { "lat": 36.18, "lon": 5.41 },
  "Béjaïa": { "lat": 36.75, "lon": 5.07 },
  "Biskra": { "lat": 34.85, "lon": 5.73 },
  "Tiaret": { "lat": 35.37, "lon": 1.32 },
  "Skikda": { "lat": 36.87, "lon": 6.87 },
  "El Oued": { "lat": 33.38, "lon": 6.87 },
  "Chlef": { "lat": 36.18, "lon": 1.33 },
  "M'sila": { "lat": 35.71, "lon": 4.55 },
  "Tizi Ouzou": { "lat": 36.71, "lon": 4.05 },
  "Laghouat": { "lat": 33.80, "lon": 2.87 },
  "Sidi Bel Abbès": { "lat": 35.18, "lon": -0.63 },
  "Djelfa": { "lat": 34.67, "lon": 3.25 },
  "Aïn Defla": { "lat": 36.28, "lon": 1.93 },
  "El Tarf": { "lat": 36.72, "lon": 8.31 },
  "Médéa": { "lat": 36.27, "lon": 2.76 },
  "Khenchela": { "lat": 35.43, "lon": 8.12 },
  "Saïda": { "lat": 34.83, "lon": -0.15 },
  "Ghardaïa": { "lat": 32.49, "lon": 3.67 },
  "Bordj Bou Arréridj": { "lat": 36.07, "lon": 4.78 },
  "Tamanrasset": { "lat": 22.79, "lon": 5.53 },
  "El Bayadh": { "lat": 33.68, "lon": 1.01 },
  "Mostaganem": { "lat": 35.93, "lon": 0.09 },
  "Relizane": { "lat": 35.74, "lon": 1.33 },
  "Tindouf": { "lat": 27.67, "lon": -8.14 },
  "Adrar": { "lat": 27.87, "lon": -0.27 },
  "Tébessa": { "lat": 35.40, "lon": 8.12 },
  "El M'Ghair": { "lat": 31.77, "lon": 5.50 },
  "Illizi": { "lat": 26.48, "lon": 9.50 }
      // Add more wilayas with corresponding coordinates
    };
    return coordinatesMap[wilaya] || { lat: 36.75, lon: 3.06 }; // Default to Alger if not found
  };

  // Update coordinates when wilaya changes
  useEffect(() => {
    const newCoordinates = fetchCoordinatesForWilaya(doctor.location);
    setCoordinates(newCoordinates);
  }, [doctor.location]);

  // Initialize map
  useEffect(() => {
    const map = L.map("map").setView([coordinates.lat, coordinates.lon], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.marker([coordinates.lat, coordinates.lon]).addTo(map);

    return () => {
      map.remove();
    };
  }, [coordinates]);

  return (
    <div className=" flex flex-col bg-gray-100 ">
     <div> <Navdoct /> </div> 
      <div className="flex min-h-[calc(100vh-3.5rem)]  ">
      <div> <Sidebardoct/> </div>  
      
        <div className="content p-10 w-full ">
        <div className="items-center text-center m-5">
  <h1 className="text-3xl  text-[#013559]">Modify my profile</h1>
</div>
        <div className="top flex gap-4 bg-white shadow-md p-4 rounded-lg mb-6">
  <img className="w-20 h-20 rounded-full" src={image || "/src/assets/doctor.png"} alt="Doctor" />
  <div className="coordonnees flex flex-col justify-center">
    <h3 className="font-bold text-xl">{doctor.name}</h3>
    <p>
      {doctor.specialization} - <span>{doctor.location}</span>
    </p>
    <p>
      {doctor.gender} - <span>{doctor.age} ans</span>
    </p>
    {/* Cacher le champ de fichier et créer un label stylisé */}
    <label
      htmlFor="image-upload"
      className="ml-52 mt-2 px-4 py-2 border border-[#0090CF] text-[#0090CF] rounded-md cursor-pointer hover:bg-[#0090CF] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Import image
    </label>
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"  // Cache l'input réel
    />
  </div>
</div>

          <div className="bottom flex gap-5">
            <div className="left w-1/2 mt-5">
              <div className="edit-profile bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium">Clinic Address</label>
                    <input
                      type="text"
                      name="clinicAddress"
                      value={doctor.clinicAddress}
                      onChange={handleInputChange}
                      className="w-full p-3 mt-1 border rounded-md border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium">Clinic Email</label>
                    <input
                      type="email"
                      name="email"
                      value={doctor.email}
                      onChange={handleInputChange}
                      className="w-full p-3 mt-1 focus:outline-none border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium">Clinic Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={doctor.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 mt-1 border focus:outline-none rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium">Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={doctor.experience}
                      onChange={handleInputChange}
                      className="w-full p-3 mt-1 border focus:outline-none rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium">Accepted Insurances</label>
                    <input
                      type="text"
                      name="insurances"
                      value={doctor.insurances.join(", ")}
                      onChange={(e) => handleInputChange({ ...e, target: { name: "insurances", value: e.target.value.split(", ") } })}
                      className="w-full p-3 mt-1 border focus:outline-none rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium">Working Hours</label>
                    <input
                      type="text"
                      name="workingHours"
                      value={doctor.workingHours.daily + " - " + doctor.workingHours.weekly}
                      onChange={handleInputChange}
                      className="w-full p-3 mt-1 border focus:outline-none rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="block text-sm font-medium">Wilaya</label>
                    <select
                      name="location"
                      value={doctor.location}
                      onChange={handleInputChange}
                      className="w-full p-3 mt-1 border focus:outline-none rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                    >
                      {wilayas.map((wilaya) => (
                        <option key={wilaya} value={wilaya}>
                          {wilaya}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full p-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
            <div className="right w-1/2 mt-6">
              <div id="map" className="w-full h-64 border rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;