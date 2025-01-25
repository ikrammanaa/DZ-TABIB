import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';  // Import useTranslation

const Welcoming = () => {
  const { t } = useTranslation();  // Access translation function

  return (
    <div className='flex justify-around'>
      <div>
        <h1 className='text-3xl m-10' style={{ color: "#013559" }}>
          {t('welcomingMessage1')} {/* Translate first part of the message */}
          <br />
          {t('welcomingMessage2')} {/* Translate second part of the message */}
        </h1>
        <p className='m-10'>
          {t('welcomingDescription')} {/* Translate the description */}
        </p>
        <Link to="/login">
          <button className='h-10 px-2 rounded ml-10' style={{ color: "#FFFFFF", backgroundColor: "#0090CF" }}>
            {t('makeAppointment')} {/* Translate button text */}
          </button>
        </Link>
      </div>
      <div>
        <img src="/src/assets/Group.png" alt="" />
      </div>
    </div>
  );
}

export default Welcoming;
