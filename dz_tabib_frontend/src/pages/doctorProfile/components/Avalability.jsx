import { useState } from 'react';
import Calendar from 'react-calendar';
import Sidebardoct from "./Sidebardoct";
import Navdoct from "./Navdoct";
import 'react-calendar/dist/Calendar.css'; // Import styles
import './customCalendar.scss'
const Avalability = () => {
 
  
const [date, setDate] = useState(new Date());
const [selectedTimes, setSelectedTimes] = useState([]); // Array to store multiple selected times

const handleDateChange = (newDate) => {
  setDate(newDate);
  setSelectedTimes([]); // Reset time selections when the date changes
};

const toggleTimeSelect = (time) => {
  // Add or remove time from the selectedTimes array
  setSelectedTimes((prev) =>
    prev.includes(time)
      ? prev.filter((t) => t !== time) // Remove if already selected
      : [...prev, time] // Add if not selected
  );
};

const handleSaveAvailability = () => {
  if (selectedTimes.length > 0) {
    alert(
      `Availability set for ${date.toDateString()} at: ${selectedTimes.join(', ')}`
    );
    // Perform save operation (e.g., API call) here
    setSelectedTimes([]);
  } else {
    alert("Please select at least one time slot before saving.");
  }
};

const handleClearAvailability = () => {
  setSelectedTimes([]); // Clear all selected times
};







  return (
    <div>
      <div> <Navdoct /></div> 
      <div className="flex flex-1 ">
       <div className='min-h-[calc(100vh-3.5rem)] '>
               <Sidebardoct className=" min-h-[calc(100vh-3.5rem)]" />
               </div>
      {/* Calendar Section */}
      
<div>
<div className="m-5">
        <h1 className="font-bold text-xl">Set Your Available Times:</h1>
      </div>
      <div className="flex items-center justify-center h-1/3 m-8">
        <Calendar value={date} onChange={handleDateChange} />
      </div>

      {/* Selected Date and Available Times */}
      <div>
        <div className="ml-5 mb-3">
          <h1 className="text-[#0090CF] font-bold">Choose the day and times:</h1>
        </div>
        <div className="ml-5">
          <p>Date:</p>
          <div className="border border-[#0090CF] p-4 rounded-lg w-72 mt-3">
            <p className='text-[#013559] '>Selected Date: {date.toDateString()}</p>
          </div>
        </div>

        {/* Time Buttons */}
        <p className='m-5'>Select time:</p>
        <div className="dates p-5 flex flex-wrap gap-5">
          {[
            "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00",
            "15:00", "16:00",
          ].map((time, index) => (
            <button
              key={index}
              className={`border border-[#0090CF] p-4 rounded-lg w-32 ${
                selectedTimes.includes(time) ? "bg-[#0090CF] text-white" : "hover:bg-[#0090CF] hover:text-white"
              }`}
              onClick={() => toggleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Save and Clear Buttons */}
        <div className="m-10 ">
          <div className="flex gap-5 ">
            <button
              className="bg-[#0090CF] text-white px-4 py-2 rounded hover:text-green-950"
              onClick={handleSaveAvailability}
            >
              Validate
            </button>
            <button
              className="border border-[#0090CF] text-[#0090CF] px-4 py-2 rounded hover:text-red-900"
              onClick={handleClearAvailability}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Avalability;