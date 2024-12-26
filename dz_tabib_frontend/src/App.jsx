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
import './App.scss';



function App() {

  return (
   <>
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signUpDoctor" element={<SignUpDoctor/>} />
        <Route path="doctors" element={<Doctors/>} />
        <Route path="doctor/:id" element={<DoctorProfile/>} />
        <Route path="appointment" element={<AppointmentPage/>} />
        <Route path="identifier" element={<Identifier/>}></Route>
        <Route path="signUpPatient" element={<SignUpPatient/>}></Route>
        <Route path="/password" element={<ForgotPassword />}></Route>
        </Routes>
        </>

    
  );
}

export default App;
