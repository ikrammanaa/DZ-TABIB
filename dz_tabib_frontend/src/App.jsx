import React from "react"
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage/HomePage";  
import { Login } from "./pages/login/Login";
import { SignUpDoctor } from "./pages/signUpDoctor/SignUpDoctor";
import { Doctors } from "./pages/doctors/Doctors";
import { DoctorProfile } from "./pages/doctorProfile/DoctorProfile";
import { AppointmentPage } from "./pages/appointmentPage/AppointmentPage";
import  { Identifier } from "./pages/identifier/Identifier";
import { SignUpPatient } from "./pages/signUpPatient/SignUpPatient";
import { ForgotPassword } from "./pages/password/ForgotPassword";
import { Patient } from "./pages/patient/Patient";


import {AccountInfo} from "./pages/patient/AccountInfo";
import {Appointments} from "./pages/patient/Appointments";
import {Historique }from "./pages/patient/Historique";
import {Consultation }from "./pages/patient/Consultation";
import { Settings }from "./pages/patient/Settings";
import  Contact from "./pages/contact/Contact";
import './App.scss';
import { DoctorCard } from "./pages/patient/DoctorCard";
import Profiledoct from "./pages/doctorProfile/components/Profiledoct";
import Avalability from "./pages/doctorProfile/components/Avalability";
import Appointements from "./pages/doctorProfile/components/Appointements";
import History from "./pages/doctorProfile/components/History";

import DoctorSettings from "./pages/doctorProfile/components/DoctorSettings";
import MapComponent from "./pages/doctorProfile/components/MapComponent";
import Editprofile from "./pages/doctorProfile/components/Editprofile";



function App() {
  
  return (
   <>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="login" element={<Login/>} />
        <Route path="signUpDoctor" element={<SignUpDoctor/>} />
        <Route path="doctors" element={<Doctors/>} />
        <Route path="doctor/:id" element={<DoctorProfile/>} />
        <Route path="appointment" element={<AppointmentPage/>} />
        <Route path="identifier" element={<Identifier/>}></Route>
        <Route path="signUpPatient" element={<SignUpPatient/>}></Route>
        <Route path="/password" element={<ForgotPassword />}></Route>
        <Route path="/patient" element={<Patient />}></Route>
       {/* Pages spécifiques aux patients */}
       <Route path="/patient" element={<Patient />} />
            <Route path="/patient/account" element={<AccountInfo />} />
            <Route path="/patient/appointments" element={<Appointments />} />
            <Route path="/patient/historique" element={<Historique />} />
            <Route path="/patient/consultation/:doctorId" element={<Consultation />} />
            <Route path="/patient/settings" element={<Settings />} />
            <Route path="/patient/doctorcard" element={<DoctorCard />} />
          {/* Pages spécifiques aux patients */}
        <Route path="profiledoct" element={<Profiledoct/>} />
        <Route path="editprofile" element={<Editprofile/>} />
        <Route path="availability" element={<Avalability/>} />
        <Route path="appointments" element={<Appointements/>} />
        <Route path="history" element={<History/>} />
        <Route path="consultation" element={<Consultation/>} />
        <Route path="settings" element={<DoctorSettings />} />
        <Route path="map" element={<MapComponent/>} />
        </Routes>
        </>

    
  );
}

export default App;
