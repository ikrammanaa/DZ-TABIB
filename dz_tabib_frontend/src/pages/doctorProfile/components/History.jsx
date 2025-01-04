import { useState } from "react";
import Sidebardoct from "./sidebardoct";
import Navdoct from "./Navdoct";

const History = () => {
  // Simulating fetched past appointments with additional patient details
  //modify to [history,setHistory] if neccessary
  const [history] = useState([
    {
      id: 1,
      patientName: "Alice Johnson",
      patientAge: 35,
      wilaya: "Algiers",
      phoneNumber: "05 68 45 11 10",
      chronicDiseases: "Hypertension, Diabetes",
      date: "2023-12-15",
      report: "Patient recovered well. Recommended a follow-up in 2 months.",
    },
    {
      id: 2,
      patientName: "Robert Brown",
      patientAge: 40,
      wilaya: "Oran",
      phoneNumber: "05 57 45 11 14",
      chronicDiseases: "Asthma",
      date: "2023-12-10",
      report: "Patient missed the appointment. No rescheduling requested.",
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null); // For tracking which appointment is selected
  const [showModal, setShowModal] = useState(false); // To toggle the modal

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setShowModal(false);
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
          {history.length > 0 ? (
            <div className="w-3/4">
              <h1 className="text-xl font-bold text-[#013559] mb-5">
                Your Appointment History:
              </h1>
              <ul className="bg-white shadow-lg rounded-lg p-5">
                {history.map((appointment) => (
                  <li
                    key={appointment.id}
                    className="border-b last:border-none py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-[#013559]">
                        Patient: {appointment.patientName}
                      </p>
                      <p>Date : {appointment.date}</p>
                      <p>Time : {appointment.time}</p>
                      <p>Status : {appointment.status}</p>
                    </div>
                    <button
                      className="text-[#0090CF] border border-[#0090CF] px-3 py-1 rounded hover:bg-[#0090CF] hover:text-white"
                      onClick={() => openModal(appointment)}
                    >
                      View Details
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-xl font-bold text-[#013559]">You do not have any past appointments!</h1>
              <p className="text-[#0090CF]">Your history is empty.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-5">
            <h2 className="text-xl font-bold text-[#013559] mb-4">
              Patient Details
            </h2>
            <div className="mb-4">
              <p className="font-bold text-[#013559]">Patient Name:</p>
              <p>{selectedAppointment.patientName}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-[#013559]">Age:</p>
              <p>{selectedAppointment.patientAge}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-[#013559]">Wilaya:</p>
              <p>{selectedAppointment.wilaya}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-[#013559]">Phone Number:</p>
              <p>{selectedAppointment.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-[#013559]">Chronic Diseases:</p>
              <p>{selectedAppointment.chronicDiseases}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-[#013559]">Appointment Date:</p>
              <p>{selectedAppointment.date}</p>
            </div>
           
        
            <div className="mb-4">
              <p className="font-bold text-[#013559]">Report:</p>
              <p>{selectedAppointment.report}</p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-[#0090CF] text-white px-4 py-2 rounded hover:bg-[#007AB8]"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
