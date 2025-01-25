import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { TbClockHour3 } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { IoChatboxEllipsesOutline, IoSettingsOutline, IoLogInOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Sidebardoct = () => {
  const { t } = useTranslation(); // Access translation function

  const menuItems = [
    { path: "/Profiledoct", label: t("myProfile"), icon: <MdOutlinePersonOutline /> },
    { path: "/availability", label: t("availability"), icon: <IoMdCalendar /> },
    { path: "/appointments", label: t("appointments"), icon: <TbClockHour3 /> },
    { path: "/history", label: t("history"), icon: <GoGraph /> },
    { path: "/consultation", label: t("consultation"), icon: <IoChatboxEllipsesOutline /> },
    { path: "/settings", label: t("settings"), icon: <IoSettingsOutline /> },
    { path: "/", label: t("signOut"), icon: <IoLogInOutline /> },
  ];

  return (
    <div className="h-full m-0 shadow-lg" style={{ backgroundColor: "#CDF5FD" }}>
      <div className="menu h-full flex flex-col gap-6 p-7">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `list-none flex gap-3 items-center p-1 rounded-lg ${
                isActive
                  ? "text-white bg-[#0090CF]"
                  : "text-[#737791] hover:bg-[#0090CF] hover:text-white"
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
