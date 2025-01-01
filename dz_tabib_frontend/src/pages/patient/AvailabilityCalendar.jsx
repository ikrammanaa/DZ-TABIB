// src/DoctorCard/patient/AvailabilityCalendar.js
import React, { useState } from "react";

// Fonction pour obtenir les dates de la semaine en fonction de la date de départ
export const getWeekDates = (startDate) => {
  const dates = [];
  const date = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    const day = new Date(date);
    dates.push(day);
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

// Composant de calendrier de disponibilité
export const AvailabilityCalendar = ({ doctor }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const weekDates = getWeekDates(currentDate);

  const nextWeek = () => {
    setCurrentDate((prevDate) => {
      const next = new Date(prevDate);
      next.setDate(next.getDate() + 7);
      return next;
    });
  };

  const prevWeek = () => {
    setCurrentDate((prevDate) => {
      const prev = new Date(prevDate);
      prev.setDate(prev.getDate() - 7);
      return prev;
    });
  };

  const handleTimeClick = (time, date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedAppointment({
      doctor,
      date: formattedDate,
      time,
    });
  };

  const confirmAppointment = () => {
    if (selectedAppointment) {
      alert(`Appointment confirmed with Dr. ${selectedAppointment.doctor.name} on ${selectedAppointment.date} at ${selectedAppointment.time}.`);
      setSelectedAppointment(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevWeek} className="text-white px-2 py-1 rounded hover:text-red-500">
          &lt; Previous
        </button>
        <h2 className="text-bluenuit hover:text-lg">
          Week: {weekDates[0].toLocaleDateString()} - {weekDates[6].toLocaleDateString()}
        </h2>
        <button onClick={nextWeek} className="text-white px-2 py-1 rounded hover:text-green">
          Next &gt;
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse rounded-lg">
          <thead>
            <tr>
              {weekDates.map((date, index) => (
                <th key={index} className="px-2 py-2 text-bluenuit font-medium">
                  {date.toLocaleDateString("en-EN", { weekday: "long", day: "numeric", month: "short" })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDates.map((date, index) => {
                const formattedDate = date.toISOString().split("T")[0];
                const times = doctor.availability[formattedDate] || [];
                return (
                  <td key={index} className="px-4 py-2">
                    {times.length > 0 ? (
                      <div className="flex flex-col items-center gap-2">
                        {times.map((time, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleTimeClick(time, date)}
                            className="bg-gray-200 shadow-lg text-blue2 px-3 py-1 rounded hover:bg-blue-200 "
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-white">--</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {selectedAppointment && (
        <div className="mt-4 p-4 bg-gray-300 bg-opacity-40 text-bluenuit border rounded">
          <h3 className="font-bold">Selected Appointment:</h3>
          <p>Doctor: {selectedAppointment.doctor.name}</p>
          <p>Date: {selectedAppointment.date}</p>
          <p>Time: {selectedAppointment.time}</p>
          <button
            onClick={confirmAppointment}
            className="bg-blue2 text-white px-4 py-2 mt-3 rounded hover:bg-blue2"
          >
            Confirm Appointment
          </button>
        </div>
      )}
    </div>
  );
};
