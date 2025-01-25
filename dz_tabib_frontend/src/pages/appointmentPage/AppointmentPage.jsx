
import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link, useLocation } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import axios from "axios";
import { doctors } from "../patient/doctors";

export const AppointmentPage = () => {
  const { state } = useLocation();
  const doctor = state?.doctor;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSituation, setSelectedSituation] = useState("");
  const [situationDescription, setSituationDescription] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  
  if (!doctor) {
    return (
      <div className="text-center text-red-500">
        Aucune donnée de médecin disponible.
      </div>
    );
  }
// Filter out past dates
const filterPastDates = () => {
  const today = new Date();
  const filteredDates = Object.keys(doctor.availability).filter((date) => {
    const dateObj = new Date(date);
    return dateObj >= today; // Only keep future dates
  });
  return filteredDates;
};
  // Handle changes in the selected date
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    // Update available times based on the selected date
    const times = doctor.availability?.[date] || [];
    setAvailableTimes(times);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSituationChange = (e) => {
    setSelectedSituation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setSituationDescription(e.target.value);
  };

  // const confirmAppointment = () => {
  //   if (selectedDate && selectedTime && selectedSituation) {
  //     alert(
  //       `Rendez-vous confirmé avec Dr. ${doctor.name} le ${selectedDate} à ${selectedTime}.
  //       Urgence: ${selectedSituation}, Description: ${situationDescription}`
  //     );
  //     // Here you can send this data to the backend to save the appointment
  //   } else {
  //     alert("Veuillez sélectionner une date, une heure et une situation.");
  //   }
  // };
  const confirmAppointment = async () => {
    if (selectedDate && selectedTime && selectedSituation) {
      try {
        const response = await axios.post("http://localhost:5000/api/appointments/create", {
          doctorId: doctor.id,
          patientName: "Patient Name", // You can replace with dynamic data
          selectedDate,
          selectedTime,
          situation: selectedSituation,
          situationDescription,
        });

        alert(response.data.message); // Successful response
      } catch (error) {
        console.error(error);
        alert("Erreur lors de la réservation du rendez-vous.");
      }
    } else {
      alert("Veuillez sélectionner une date, une heure et une situation.");
    }
  };


const mapRef = useRef(null);
const markerRef = useRef(null);

useEffect(() => {
  if (!mapRef.current) {
    // Initialisation de la carte centrée sur le docteur
    mapRef.current = L.map("map").setView([doctor.lat, doctor.lon], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Ajouter un marqueur unique pour le docteur
    markerRef.current = L.marker([doctor.lat, doctor.lon])
      .addTo(mapRef.current)
      .bindPopup("Chargement des informations...")
      .openPopup();

    // Charger des données supplémentaires
    fetchNearbyPlaces(doctor.lat, doctor.lon);
  }
}, [doctor]);

// Fonction pour récupérer les lieux proches via OpenStreetMap (Overpass API)
const fetchNearbyPlaces = async (lat, lon) => {
  try {
    const overpassQuery = `
      [out:json];
      (
        node["amenity"="pharmacy"](around:1000, ${lat}, ${lon});
        node["amenity"="hospital"](around:1000, ${lat}, ${lon});
        node["highway"="bus_stop"](around:1000, ${lat}, ${lon});
      );
      out body;
    `;
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      overpassQuery,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const places = response.data.elements;
    
    // Filtrer et limiter les résultats à 5 ou 6 lieux maximum
    const filteredPlaces = places.slice(0, 6);

    const nearbyInfo = filteredPlaces
      .map((place) => {
        if (place.tags.amenity === "pharmacy") {
          return `<p><strong>Pharmacie :</strong> ${place.tags.name || "Inconnue"}</p>`;
        } else if (place.tags.amenity === "hospital") {
          return `<p><strong>Hôpital :</strong> ${place.tags.name || "Inconnu"}</p>`;
        } else if (place.tags.highway === "bus_stop") {
          return `<p><strong>Arrêt de bus :</strong> ${place.tags.name || "Inconnu"}</p>`;
        }
        return null;
      })
      .filter(Boolean)
      .join("");

    // Mettre à jour le popup avec les infos
    if (markerRef.current) {
      markerRef.current.setPopupContent(
        `
        <b>${doctor.name}</b><br>${doctor.specialization}<br>${doctor.location}
        <hr>
        ${nearbyInfo || "<p>Aucun lieu à proximité trouvé.</p>"}
        `
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des lieux :", error);
    if (markerRef.current) {
      markerRef.current.setPopupContent(
        `<b>${doctor.name}</b><br>${doctor.specialization}<br>${doctor.location}<br><p>Impossible de charger les lieux proches.</p>`
      );
    }
  }
};
////////map end//////////////


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
    {/* Doctor Profile Section */}
    <div className="bg-sky-100 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
            <img
              src={doctor.img && doctor.img !== "" ? doctor.img : "/default-doctor.jpg"}
              alt={`Dr. ${doctor.name}`}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "/default-doctor.jpg")} // Fallback if image fails to load
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-sky-600">{doctor.name}</h1>
            <p className="text-lg text-gray-500">{doctor.specialization}</p>
            <p className="text-md text-gray-600">{doctor.location}</p>
          </div>
        </div>

        <Link to={`/patient/consultation/${doctor.id}`} className="text-sky-600 hover:text-sky-800 flex items-center">
          <FaVideo className="w-6 h-6" /> {/* Video Call Icon */}
          <span className="ml-2">Consultation <br /> Video Call</span>
        </Link>
      </div>
    </div>

    {/* Appointment Booking Section */}
    <div className="max-w-4xl mx-auto p-6 bg-sky-50 space-y-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-gray-800">Book Your Appointment Online</h1>
        <p className="text-gray-600">Please fill in the following information</p>

        {/* Dates and Times Selection */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Dates Section */}
          <div className="flex-1">
            {filterPastDates().map((date, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                  className="w-full flex justify-between items-center p-4 bg-white border rounded-lg hover:shadow"
                >
                  <span className="font-medium">{date}</span>
                  <span className="text-sky-600">{selectedDate === date ? "▲" : "▼"}</span>
                </button>
                {selectedDate === date && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {doctor.availability[date].map((time, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 ${selectedTime === time ? "bg-sky-500 text-white" : "bg-sky-100 text-sky-800"} rounded hover:bg-sky-200`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="w-full mt-4 text-sky-700 font-medium hover:underline">See more dates</button>
          </div>

        {/* Appointment Details Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <p className="text-sky-600 text-sm"><strong>Type:</strong> {doctor.consultationType || "Consultation"}</p>

          {/* Patient Situation Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Select the urgency of your situation:</label>
            <select className="w-full bg-sky-200 p-2 mt-2 border rounded-lg" value={selectedSituation} onChange={handleSituationChange}>
              <option value="" disabled>Choose an option</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
              <option value="follow-up">Follow-up</option>
              <option value="routine">Routine</option>
            </select>
          </div>

          {/* Patient Situation Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Describe your situation:</label>
            <textarea
              className="w-full p-2 mt-2 border rounded-lg"
              rows="4"
              placeholder="E.g., Symptoms, pain, or other important details..."
              value={situationDescription}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Confirm Appointment Button */}
      <div className="mt-6">
        <button
          onClick={confirmAppointment}
          className={`w-full p-4 bg-sky-600 text-white rounded-lg ${selectedTime && selectedSituation ? "hover:bg-sky-700" : "opacity-50 cursor-not-allowed"}`}
          disabled={!selectedTime || !selectedSituation}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
{/* Access Information Section */}
<div className="bg-sky-100 rounded-lg p-6 shadow-md">
  <h2 className="text-lg font-bold text-sky-600 mb-4">
    Card and Access Information
  </h2>

  <div className="space-y-4">
    {/* Contact Information */}
    <p className="font-semibold text-sky-800">Phone:</p>
    <span className="text-gray-500">{doctor.phoneNumber || "Not available"}</span>

    {/* Insurance Information */}
    <p className="font-semibold text-sky-800">Insurance:</p>
    <span className="text-gray-500">
      Accepted insurance: {doctor.insurance?.join(", ") || "Not specified"}
    </span>

    {/* Consultation Methods */}
    <p className="font-semibold text-sky-800">Consultation Methods:</p>
    <span className="text-gray-500">
      {doctor.consultationMethods?.join(", ") || "In-person, Online"}
    </span>

    {/* Clinic Facilities */}
    <p className="font-semibold text-sky-800">Clinic Facilities:</p>
    <span className="text-gray-500">
      {doctor.location || "Not specified"}
    </span>
  </div>

  {/* Optional: You can still add the map here if you'd like */}
  <div id="map" className="  mt-4 p-40 w-full h-64 rounded"></div>
</div>


    </div>
  );
};
