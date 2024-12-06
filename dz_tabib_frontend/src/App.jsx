import React from "react"
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage/HomePage";  
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signUp/SignUp";
import { Doctors } from "./pages/doctors/Doctors";
import { DoctorProfile } from "./pages/doctorProfile/DoctorProfile";
import { AppointmentPage } from "./pages/appointmentPage/AppointmentPage";
import './App.scss';


function App() {

  return (
   <>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="doctors" element={<Doctors/>} />
        <Route path="doctor/:id" element={<DoctorProfile/>} />
        <Route path="appointment" element={<AppointmentPage/>} />
        </Routes>
        </>

    
  );
}

export default App;
