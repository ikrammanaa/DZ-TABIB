import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";


const Nav2 = () => {
    return (
        <nav style={{ backgroundColor: "#CDF5FD" }}>
             <div
               className="w-full flex justify-between items-center px-10 py-2"
               style={{ fontFamily: "montserrat" }}
             >
               <div className="logo">
                 <img src="/src/assets/logo.png" alt="Logo" className="w-18 h-16" />
               </div>
               <div className="part2 flex gap-5">
                 <Link to="/" className="text-base hover:underline ">
                   Home
                 </Link>
                 <Link to="/contact" className="underline">
                   Contact Us
                 </Link>
               </div>
               <div className="part3 flex gap-6">
                 <Link to="/login" style={{ color: "#0090CF" }} className="hover:underline">
                   Login
                 </Link>
                 <button
                   className="flex items-center gap-2 w-22 px-1 h-8 rounded"
                   style={{
                     backgroundColor: "#0090CF",
                     color: "#FFFFFF",
                     fontFamily: "montserrat",
                   }}
                 >
                   Join Us <FaArrowRight />
                 </button>
               </div>
             </div>
           </nav>
    );
}

export default Nav2;