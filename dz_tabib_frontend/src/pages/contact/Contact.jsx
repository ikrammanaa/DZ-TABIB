import Footer from "../../components/footer";
import Hero from "../homePage/components/hero";
import Welcoming from "../homePage/components/welcoming";
import Nav2 from "./components/nav2";
import Forrm from "./components/forrm";
const Contact = () => {
    return (
        <div>
            <Nav2/>
            <div> <Hero/></div>
            <div><Forrm/></div>
            <div className="m-20">  <Welcoming/> </div>
            <div> <Footer/> </div>
           
        </div>
    );
}

export default Contact;