import { useTranslation } from 'react-i18next';
import Navbar from "../../components/global/navbar/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import Doctors from "./components/doctors";
import ContactUs from "./components/Contact-us";
import Welcoming from "./components/welcoming";
import Footer from "../../components/footer";

export const HomePage = () => {
  const { t } = useTranslation(); // Access the translation function

  return (
    <div className="container-glb" style={{ fontFamily: "montserrat" }}>
      <div className="1">
        <Navbar />
      </div>
      <div className="2">
        <Hero />
      </div>
      <div className="3 m-20">
        <h2>{t('services')}</h2> {/* Translate the text here */}
        <Services />
      </div>
      <div className="4 m-20">
        <h2>{t('doctors')}</h2> {/* Translate the text here */}
        <Doctors />
      </div>
      <div className="5 m-20">
        <h2>{t('contactUs')}</h2> {/* Translate the text here */}
        <ContactUs />
      </div>
      <div className="6 m-20">
        <h2>{t('welcoming')}</h2> {/* Translate the text here */}
        <Welcoming />
      </div>
      <div className="7">
        <Footer />
      </div>
    </div>
  );
};
