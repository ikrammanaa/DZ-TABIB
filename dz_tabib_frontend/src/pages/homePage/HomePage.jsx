// import PropTypes from "prop-types";
import Navbar from "../../components/global/navbar/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import Doctors from "./components/doctors";
import ContactUs from "./components/Contact-us";
import Welcoming from "./components/welcoming";
import Footer from "../../components/footer";
export const HomePage = () => {
  return (
    <div className="container-glb"  style={{ fontFamily:"montserrat"  }}>
      <div className="1">
        <Navbar/>
        </div>
 <div className="2">
  <Hero/>
  </div>
 <div className="3 m-20">
  <Services/>
 </div>
 <div className="4 m-20">
  <Doctors/>
 </div>
 <div className="5">
  <ContactUs/>
 </div>
 <div className="6  m-20">
  <Welcoming/>
 </div>
 <div className="7 ">
  <Footer/>
 </div>
    </div>
   

);
};

