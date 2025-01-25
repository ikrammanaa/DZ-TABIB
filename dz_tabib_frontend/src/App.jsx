import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage/HomePage";  
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signUp/SignUp";
import { Doctors } from "./pages/doctors/Doctors";
import { DoctorProfile } from "./pages/doctorProfile/DoctorProfile";
import { AppointmentPage } from "./pages/appointmentPage/AppointmentPage";
import Contact from "./pages/contact/Contact";
import Profiledoct from "./pages/doctorProfile/components/Profiledoct";
import Avalability from "./pages/doctorProfile/components/Avalability";
import Appointements from "./pages/doctorProfile/components/Appointements";
import History from "./pages/doctorProfile/components/History";
import Consultation from "./pages/doctorProfile/components/consultation";
import Settings from "./pages/doctorProfile/components/Settings";
import MapComponent from "./pages/doctorProfile/components/MapComponent";
import Editprofile from "./pages/doctorProfile/components/Editprofile";
import"./i18n";
import './App.scss';


function App() {

  return (
   <>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/contact" element={<Contact />} />

        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="doctors" element={<Doctors/>} />
        <Route path="doctor/:id" element={<DoctorProfile/>} />
        <Route path="profiledoct" element={<Profiledoct/>} />
        <Route path="editprofile" element={<Editprofile/>} />
        <Route path="availability" element={<Avalability/>} />
        <Route path="appointments" element={<Appointements/>} />
        <Route path="history" element={<History/>} />
        <Route path="consultation" element={<Consultation/>} />
        <Route path="settings" element={<Settings/>} />
        <Route path="map" element={<MapComponent/>} />

        <Route path="appointment" element={<AppointmentPage/>} />
        </Routes>
        </>

    
  );
}

export default App;
