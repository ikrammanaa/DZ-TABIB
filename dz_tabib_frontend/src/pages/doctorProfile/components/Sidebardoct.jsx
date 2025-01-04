import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { TbClockHour3 } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { IoChatboxEllipsesOutline, IoSettingsOutline, IoLogInOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebardoct = () => {
  const menuItems = [
    { path: "/Profiledoct", label: "My Profile", icon: <MdOutlinePersonOutline  /> },
    { path: "/availability", label: "Availability", icon: <IoMdCalendar /> },
    { path: "/appointments", label: "Appointments", icon: <TbClockHour3 /> },
    { path: "/history", label: "History", icon: <GoGraph /> },
    { path: "/consultation", label: "Consultation", icon: <IoChatboxEllipsesOutline /> },
    { path: "/settings", label: "Settings", icon: <IoSettingsOutline /> },
    { path: "/", label: "Sign out", icon: <IoLogInOutline /> },
  ];

  return (
    <div className="h-full  m-0 shadow-lg" style={{ backgroundColor: "#CDF5FD" }}>
      <div className="menu h-full flex flex-col gap-6 p-7">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `list-none flex gap-3 items-center p-1 rounded-lg ${
                isActive ? "text-white bg-[#0090CF]" : "text-[#737791] hover:bg-[#0090CF] hover:text-white"
              }`
            }
          >
           <div className="flex flex-row items-center gap-3">
    <span className="text-xl">{item.icon}</span>
    <p>{item.label}</p>
  </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebardoct;





// import { MdOutlinePersonOutline } from "react-icons/md";
// import { IoMdCalendar } from "react-icons/io";
// import { TbClockHour3 } from "react-icons/tb";
// import { GoGraph } from "react-icons/go";
// import { IoChatboxEllipsesOutline } from "react-icons/io5";
// import { IoSettingsOutline } from "react-icons/io5";
// import { IoLogInOutline } from "react-icons/io5";

// const Sidebardoct = () => {
//     return (
//         <div>
//             <div className="sidebar h-screen w-60" style={{ backgroundColor: "#CDF5FD" }}>
//                 <div className="logo p-5">
//                     <img className="h-16" src="/src/assets/logo.png" alt=".." />
//                 </div>
//                 <div className="menu flex flex-col gap-6 p-7 mt-2">

//                     <li 
//                         className="list-none flex gap-3 items-center p-2 rounded-lg text-white bg-[#0090CF]"
//                     >
//                         <MdOutlinePersonOutline className="size-8" />
//                         <p>My Profile</p>
//                     </li>
//                     <li 
//                         className="list-none flex gap-3 items-center p-1 rounded-lg text-[#737791] hover:bg-[#0090CF] hover:text-white"
//                     >
//                         <IoMdCalendar className="size-8" />
//                         <p>Availability</p>
//                     </li>
//                     <li 
//                         className="list-none flex gap-3 items-center p-1 rounded-lg text-[#737791] hover:bg-[#0090CF] hover:text-white"
//                     >
//                         <TbClockHour3 className="size-8" />
//                         <p>Appointments</p>
//                     </li>
//                     <li 
//                         className="list-none flex gap-3 items-center p-1 rounded-lg text-[#737791] hover:bg-[#0090CF] hover:text-white"
//                     >
//                         <GoGraph className="size-8" />
//                         <p>History</p>
//                     </li>
//                     <li 
//                         className="list-none flex gap-3 items-center p-1 rounded-lg text-[#737791] hover:bg-[#0090CF] hover:text-white"
//                     >
//                         <IoChatboxEllipsesOutline className="size-8" />
//                         <p>Consultation</p>
//                     </li>
//                     <li 
//                         className="list-none flex gap-3 items-center p-1 rounded-lg text-[#737791] hover:bg-[#0090CF] hover:text-white"
//                     >
//                         <IoSettingsOutline className="size-8" />
//                         <p>Settings</p>
//                     </li>
//                     <li 
//                         className="list-none flex gap-3 items-center p-1 rounded-lg text-[#737791] hover:bg-[#0090CF] hover:text-white"
//                     >
//                         <IoLogInOutline className="size-8" />
//                         <p>Sign out</p>
//                     </li>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Sidebardoct;
