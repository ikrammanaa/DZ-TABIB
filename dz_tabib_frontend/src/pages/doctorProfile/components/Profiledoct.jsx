import { useState, useEffect, useRef } from "react";
import Sidebardoct from "./sidebardoct";
import Navdoct from "./Navdoct";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const ProfileDoctor = () => {
  const { t } = useTranslation(); // Use the translation hook

  const [doctor] = useState({
    name: "Dr. Dahmane Bushra",
    specialization: "Cardiologue",
    location: "Alger",
    gender: "Male",
    age: 40,
    experience: "10 ans expérience",
    clinicAddress: "123 Health Street, Alger",
    email: "clinic1@clinic.com",
    phone: "05 55 66 78 99",
    insurances: ["CNAS", "CASH", "Assurance Privée"],
    workingHours: { daily: "8 heures", weekly: "5 jours" },
  });

  const [coordinates, setCoordinates] = useState({
    lat: 36.75,
    lon: 3.06,
  });
  const [address, setAddress] = useState("Adresse introuvable");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Fetch Address Based on Coordinates
  const fetchAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      return data.display_name || t('addressNotFound'); // Use translation
    } catch (error) {
      console.error("Erreur lors de la récupération de l’adresse :", error);
      return t('addressError'); // Use translation
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([coordinates.lat, coordinates.lon], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Draggable Marker
      markerRef.current = L.marker([coordinates.lat, coordinates.lon], {
        draggable: true,
      }).addTo(mapRef.current);

      // On Drag End
      markerRef.current.on("dragend", async () => {
        const newLat = markerRef.current.getLatLng().lat;
        const newLon = markerRef.current.getLatLng().lng;

        setCoordinates({ lat: newLat, lon: newLon });
        const fetchedAddress = await fetchAddressFromCoordinates(newLat, newLon);
        setAddress(fetchedAddress);
      });
    }
  }, []);

  // Update Map View When Coordinates Change
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      mapRef.current.setView([coordinates.lat, coordinates.lon], 12);
      markerRef.current.setLatLng([coordinates.lat, coordinates.lon]);
    }
  }, [coordinates]);

  return (
    <div className=" h-full flex flex-col">
      <div><Navdoct /></div>
      <div className="flex flex-1">
        <div>
          <Sidebardoct className=" h-[calc(100vh-3.5rem)]" />
        </div>
        <div className="content p-10 w-full h-[calc(100vh-3.5rem)]">
          <div className="top flex gap-4">
            <img className="w-20" src="/src/assets/doctor.png" alt="Doctor" />
            <div className="coordonnees">
              <h3 className="font-bold">{doctor.name}</h3>
              <p>
                {doctor.specialization} - <span>{doctor.location}</span>
              </p>
              <p>
                {doctor.gender} - <span>{doctor.age} {t('yearsOld')}</span>
              </p>
            </div>
          </div>
          <div className="bottom flex">
            {/* Left Section */}
            <div className="left w-1/2 mt-5">
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  {t('specialization')}
                </h3>
                <p>{doctor.specialization}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  {t('experience')}
                </h3>
                <p>{doctor.experience}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  {t('clinicInfo')}
                </h3>
                <p>{t('address')}: {doctor.clinicAddress}</p>
                <p>{t('email')}: {doctor.email}</p>
                <p>{t('phone')}: {doctor.phone}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  {t('insurancesAccepted')}
                </h3>
                <p>{doctor.insurances.join(", ")}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  {t('workingHours')}
                </h3>
                <p>{t('dailyHours')}: {doctor.workingHours.daily}</p>
                <p>{t('weeklyDays')}: {doctor.workingHours.weekly}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="right w-1/2 mt-6">
              <div id="map" className="w-full h-64 border rounded-md"></div>
              <p className="mt-4">
                <strong>{t('address')}:</strong> {address}
              </p>
              <Link to="/editprofile">
                <button className="mt-4 ml-72 p-2 bg-blue-500 text-white rounded">
                  {t('modifyProfile')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDoctor;


// import { useState } from 'react';
// import Sidebardoct from './sidebardoct';
// import Navdoct from './Navdoct';
// import MapComponent from './MapComponent';

// const ProfileDoctor = () => {
// //   const [address, setAddress] = useState(''); // Store the address or any relevant data
// //   const [lat, setLat] = useState(35.54);      // Default latitude
// //   const [lon, setLon] = useState(6.15);       // Default longitude

// //   const fetchAddressFromCoordinates = async (lat, lon) => {
// //     try {
// //       // Corrected URL format for the fetch call
// //       const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
// //       const data = await response.json();
// //       return data.display_name;  // Return the address
// //     } catch (error) {
// //       console.error('Error fetching address:', error);
// //       return null;
// //     }
// //   };

// //   const handleAddressSelect = (newLat, newLon) => {
// //     setLat(newLat);
// //     setLon(newLon);
// //     // Fetch the address from the coordinates
// //     fetchAddressFromCoordinates(newLat, newLon).then((address) => setAddress(address || 'Address not found'));
// //   };

//   return (
//     <div>
//       <Navdoct />
//       <div className="flex">
//         <Sidebardoct />
//         <div className="content p-10 w-full">
//           <div className="top flex gap-4">
//             <img className="w-20" src="/src/assets/doctor.png" alt="Doctor" />
//             <div className="coordonnés">
//               <h3 className="font-bold">Dr. Dahmane Bushra</h3>
//               <p>Cardiologue - <span>Alger</span></p>
//               <p>Male - <span>40 years old</span></p>
//             </div>
//           </div>
//           <div className="bottom flex">
//             <div className="left w-1/2 mt-5">
//               <div>
//                 <h3>Speciality</h3>
//                 <p>Cardiologue</p>
//               </div>
//               <div>
//                 <h3>Experience</h3>
//                 <p>10 years working at...</p>
//               </div>
//               <div>
//                 <h3>Clinic Info</h3>
//                 <p>Address: 123 Health Street, Algiers</p>
//                 <p>Email: clinic1@clinic.com</p>
//                 <p>Phone number: 05 55 66 78 99</p>
//               </div>
//               <div>
//                 <h3>Accepted insurances</h3>
//                 <p>CNAS, CASH, Private Insurance</p>
//               </div>
//               <div>
//                 <h3>Working Time</h3>
//                 <p>Hours per Day: 8 hours</p>
//                 <p>Days per Week: 5 days</p>
//               </div>
//             </div>
//              {/* <div className="right w-1/2 mt-6">
//               <MapComponent lat={lat} lon={lon} onAddressSelect={handleAddressSelect} />
//               <p>{address}</p> 
//             </div>  */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDoctor;
