import { FaLinkedin } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className='flex justify-around p-20' style={{backgroundColor:'#0090CF'}}>
           <div className="flex flex-col items-center p-5">
  <img src="/src/assets/logo.png" alt="Logo" className="w-18 h-16 mb-20" />
  <p className="text-center text-white text-sm">
    Copyright © 2022 BRIX <br /> Templates | All Rights Reserved
  </p>
</div>


            <div className="flex flex-col justify-center items-start ">
  <h1 style={{ color: '#FFFFFF' }} className="mb-5 font-bold">Our Pages</h1>
  <div className="page-link flex flex-col items-start gap-2">
   <Link to="/"> <a href="" className="text-white">Home Page</a></Link>
   <Link to="/contact"> <a href="" className="text-white">Contact Us</a></Link>
   <Link to="/login"> <a href="" className="text-white">Log in Page</a></Link>
   <Link to="/identifier"> <a href="" className="text-white">Sign Up Page</a></Link>
  </div>
</div>


<div className="flex flex-col justify-center items-start p-5 mt-5">
  <h1 style={{ color: '#FFFFFF' }} className="mb-5 font-bold">Follow Us</h1>
  <div className="facebook flex items-start gap-2 mb-3">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <FaSquareFacebook className="h-7 w-7" style={{ color: '#FFFFFF' }} />
    </a>
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
      Facebook
    </a>
  </div>
  <div className="Twitter flex items-start gap-2 mb-3">
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <FaSquareTwitter className="h-7 w-7" style={{ color: '#FFFFFF' }} />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
      Twitter
    </a>
  </div>
  <div className="Instagram flex items-start gap-2 mb-3">
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <FaSquareInstagram className="h-7 w-7" style={{ color: '#FFFFFF' }} />
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
      Instagram
    </a>
  </div>
  <div className="Linkedin flex items-start gap-2">
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="h-7 w-7" style={{ color: '#FFFFFF' }} />
    </a>
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
      Linkedin
    </a>
  </div>
</div>

        </div>
    );
}

export default Footer;