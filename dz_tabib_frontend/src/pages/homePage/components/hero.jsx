import { useTranslation } from 'react-i18next';  // Import useTranslation
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();  // Access translation function

  return (
    <div className='container-glb w-full h-full px-20 mx-0' style={{ backgroundColor: "#CDF5FD", fontFamily: "montserrat" }}>
      <div className="container2 flex items-center justify-between gap-40">
        <div className="left ml-16 mt-20">
          <h1 className='text-5xl font-bold mb-5  ' style={{ color: "#013559" }}>
            {t('meetTheBestDoctors')}
          </h1> {/* Translate the text */}
          <p className='mb-10 text-2xl' style={{ color: "#737373" }}>
            {t('focusedOnHelping')} {/* Translate the text */}
          </p>
          <Link to="/login">
            <button className='h-10 px-2 rounded ' style={{ color: "#FFFFFF", backgroundColor: "#0090CF" }}>
              {t('makeAnAppointment')} {/* Translate the text */}
            </button>
          </Link>
        </div>
        <div className="right mt-20">
          <img src="/src/assets/Dr model.png" alt="" className='ml-10 mt-20' />
        </div>
      </div>
    </div>
  );
}

export default Hero;
