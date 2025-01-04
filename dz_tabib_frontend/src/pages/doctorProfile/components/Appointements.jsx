import { useState } from "react";
import Sidebardoct from "./sidebardoct";
import Navdoct from "./Navdoct";

const Appointements = () => {
  // Simulating fetched appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-01-05",
      time: "10:00 AM",
      status: "Pending",
      report: "",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-01-06",
      time: "2:00 PM",
      status: "Pending",
      report: "",
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null); // To track which appointment is being managed
  const [status, setStatus] = useState(""); // To store appointment status
  const [report, setReport] = useState(""); // To store the appointment report
  const [showModal, setShowModal] = useState(false); // To toggle the modal

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setStatus(appointment.status);
    setReport(appointment.report);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setStatus("");
    setReport("");
    setShowModal(false);
  };

  const handleSave = () => {
    if (!status || !report) {
      alert("Please select a status and write a report before saving.");
      return;
    }

    // Update the specific appointment in the appointments array
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? { ...appointment, status, report }
          : appointment
      )
    );

    alert(`Appointment with ${selectedAppointment.patientName} updated:
      Status: ${status}
      Report: ${report}`);
    closeModal();
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
          {appointments.length > 0 ? (
            <div className="w-3/4">
              <h1 className="text-xl font-bold text-[#013559] mb-5">Your Appointments:</h1>
              <ul className="bg-white shadow-lg rounded-lg p-5">
                {appointments.map((appointment) => (
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
                      Manage Appointment
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-xl font-bold text-[#013559]">You do not have any next appointments!</h1>
              <p className="text-[#0090CF]">Take a rest dear Doctor</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-5">
            <h2 className="text-xl font-bold text-[#013559] mb-4">
              Manage Appointment with {selectedAppointment.patientName}
            </h2>
            <div className="mb-4">
  <label className="block font-bold text-[#013559] mb-2">
    Was the appointment done?
  </label>
  <div className="flex gap-4">
    <button
      className={`px-4 py-2 rounded ${
        status === "done"
          ? "bg-[#0090CF] text-white"
          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setStatus("done")}
    >
      Appointment Done
    </button>
    <button
      className={`px-4 py-2 rounded ${
        status === "doctor_absent"
          ? "bg-[#0090CF] text-white"
          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setStatus("doctor_absent")}
    >
      Doctor was Absent
    </button>
    <button
      className={`px-4 py-2 rounded ${
        status === "patient_absent"
          ? "bg-[#0090CF] text-white"
          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setStatus("patient_absent")}
    >
      Patient was Absent
    </button>
  </div>
</div>

            <div className="mb-4">
              <label className="block font-bold text-[#013559] mb-2">The appointment  rapport :</label>
              <textarea
                value={report}
                onChange={(e) => setReport(e.target.value)}
                rows="4"
                className="border border-gray-300 rounded-lg p-2 w-full outline-none"
                placeholder="Write a detailed report for this appointment..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-[#0090CF] text-white px-4 py-2 rounded hover:bg-[#007AB8]"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="border border-[#0090CF] text-[#0090CF] px-4 py-2 rounded hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointements;
