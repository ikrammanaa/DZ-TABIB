import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const Doctors = () => {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // For autocomplete

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([35.54, 6.15], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }
  }, []);

  const updateMap = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);

    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 12);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
      } else {
        markerRef.current = L.marker([lat, lon], { draggable: true }).addTo(mapRef.current);
        markerRef.current.on("dragend", () => {
          const newLat = markerRef.current.getLatLng().lat;
          const newLon = markerRef.current.getLatLng().lng;
          setLatitude(newLat);
          setLongitude(newLon);
        });
      }
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${query}&limit=5`
      );
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

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    updateMap(suggestion.lat, suggestion.lon);
    setSuggestions([]); // Clear suggestions after selection
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!latitude || !longitude) {
      setError("Please select a valid city.");
      setIsSubmitting(false);
      return;
    }

    const formData = {
      city,
      latitude,
      longitude,
    };

    try {
      const response = await fetch("https://your-backend-url.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Doctor Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter your city"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white ${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Map</h2>
        <div id="map" className="w-full h-64 border rounded-md"></div>
        <div className="mt-4">
          <h3 className="text-md font-semibold">Coordinates</h3>
          <p className="text-gray-700">
            Latitude: {latitude !== null ? latitude.toFixed(6) : "N/A"}
          </p>
          <p className="text-gray-700">
            Longitude: {longitude !== null ? longitude.toFixed(6) : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
