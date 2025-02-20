import { useState, useEffect ,useRef}from "react";
import Sidebardoct from "./Sidebardoct";
import Navdoct from "./Navdoct";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
const ProfileDoctor = () => {
 
  // State to hold doctor's information
  {/*si les infos change on ajoute ,setDoctor !!!!!*/}
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
      return data.display_name || "Adresse introuvable";
    } catch (error) {
      console.error("Erreur lors de la récupération de l’adresse :", error);
      return "Erreur de récupération de l’adresse";
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
    <div className=" h-full flex flex-col " >
    <div> <Navdoct /></div> 
      <div className="flex flex-1">
       <div>
               <Sidebardoct className=" h-[calc(100vh-3.5rem)] " />
               </div>
        <div className="content p-10 w-full h-[calc(100vh-3.5rem)] ">
          <div className="top flex gap-4">
            <img className="w-20" src="/src/assets/doctor.png" alt="Doctor" />
            <div className="coordonnees">
              <h3 className="font-bold">{doctor.name}</h3>
              <p>
                {doctor.specialization} - <span>{doctor.location}</span>
              </p>
              <p>
                {doctor.gender} - <span>{doctor.age} ans</span>
              </p>
            </div>
          </div>
          <div className="bottom flex">
            {/* Left Section */}
            <div className="left w-1/2 mt-5">
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  Spécialité
                </h3>
                <p>{doctor.specialization}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  Expérience
                </h3>
                <p>{doctor.experience}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  Informations sur la clinique
                </h3>
                <p>Adresse: {doctor.clinicAddress}</p>
                <p>Email: {doctor.email}</p>
                <p>Téléphone: {doctor.phone}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  Assurances acceptées
                </h3>
                <p>{doctor.insurances.join(", ")}</p>
              </div>
              <div className="m-2">
                <h3 className="font-bold" style={{ color: "#0090CF" }}>
                  Horaires de travail
                </h3>
                <p>Heures par jour: {doctor.workingHours.daily}</p>
                <p>Jours par semaine: {doctor.workingHours.weekly}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="right w-1/2 mt-6">
              <div id="map" className="w-full h-64 border rounded-md"></div>
              <p className="mt-4">
                <strong>Adresse:</strong> {address}
              </p>
              <Link to="/editprofile">
        <button className="mt-4 ml-72 p-2 bg-blue-500 text-white rounded">
          Modify Profile
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


