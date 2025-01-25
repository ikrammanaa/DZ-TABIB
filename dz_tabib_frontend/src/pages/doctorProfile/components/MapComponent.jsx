import  { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const UnifiedMapComponent = ({ lat, lon, onMarkerDrag }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && lat && lon) {
      mapRef.current.setView([lat, lon], 13);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
      } else {
        markerRef.current = L.marker([lat, lon], { draggable: true }).addTo(mapRef.current);
        markerRef.current.on("dragend", () => {
          const { lat: newLat, lng: newLon } = markerRef.current.getLatLng();
          onMarkerDrag(newLat, newLon);
        });
      }
    }
  }, [lat, lon, onMarkerDrag]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

UnifiedMapComponent.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  onMarkerDrag: PropTypes.func.isRequired,
};

export default UnifiedMapComponent;


// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = ({ latitude, longitude, onMarkerDrag }) => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map").setView([35.54, 6.15], 5);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         maxZoom: 19,
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(mapRef.current);
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove(); // Cleanup map instance
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (latitude !== null && longitude !== null && mapRef.current) {
//       mapRef.current.setView([latitude, longitude], 12);

//       if (markerRef.current) {
//         markerRef.current.setLatLng([latitude, longitude]);
//       } else {
//         markerRef.current = L.marker([latitude, longitude], { draggable: true }).addTo(mapRef.current);
//         markerRef.current.on("dragend", () => {
//           const newLat = markerRef.current.getLatLng().lat;
//           const newLon = markerRef.current.getLatLng().lng;
//           if (onMarkerDrag) {
//             onMarkerDrag(newLat, newLon);
//           }
//         });
//       }
//     }
//   }, [latitude, longitude, onMarkerDrag]);

//   return <div id="map" className="w-full h-64 border rounded-md"></div>;
// };

// export default MapComponent;
