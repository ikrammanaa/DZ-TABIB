import { useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";

const Navdoct = () => {
  // State to hold doctor's information
  const [doctor] = useState({
    name: "Dahmane Boushra",
    image: "/src/assets/doctor.png",
  });

  return (
    <div className="navbar w-full h-14 flex items-center justify-between px-4 bg-[#CDF5FD] shadow-md">
      <div className="logo">
        <img className="h-14" src="/src/assets/logo.png" alt="Logo" />
      </div>

      <div className="account-name flex items-center gap-4 text-right text-gray-700 font-semibold">
        <img className="h-12" src={doctor.image} alt="Doctor" />
        <div className="flex items-center gap-2">
          <p>{doctor.name}</p>
          {/* <IoIosArrowDown /> */}
        </div>
      </div>
    </div>
  );
};

export default Navdoct;
