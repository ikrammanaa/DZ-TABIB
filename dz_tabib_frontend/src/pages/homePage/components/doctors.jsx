import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useTranslation } from 'react-i18next';  // Import useTranslation

const Doctors = () => {
  const { t } = useTranslation();  // Access translation function

  return (
    <div style={{ fontFamily: "montserrat" }}>
      <div>
        <h1 className="ml-40 text-3xl p-5 font-bold" style={{ color: "#013559" }}>
          {t('meetOurTopDoctors')}
        </h1> {/* Translate the text */}
        <p className="ml-40 p-5">{t('conflictExplanation')}</p> {/* Translate the text */}
      </div>
      <div className="flex justify-center gap-10 mt-20">
        {/* Repeat for each doctor card */}
        <div className="p-8 shadow-2xl" style={{ backgroundColor: "#FAFAFA" }}>
          <div className="flex justify-center gap-7">
            <FaStar /><FaStar /><FaStar /><FaStar /><CiStar />
          </div>
          <p className="p-5" style={{ color: "#737373" }}>
            {t('doctorDescription')}
          </p>
          <div className="flex gap-5 m-5">
            <img src="/src/assets/circle.png" alt="" />
            <div>
              <h3 className="font-bold" style={{ color: "#0090CF" }}>
                Regina Miles
              </h3>
              <p className="font-bold">{t('designer')}</p> {/* Translate the text */}
            </div>
          </div>
        </div>

        {/* Add additional doctor cards as needed */}
        {/* Example for another doctor */}
        <div className="p-8 shadow-2xl" style={{ backgroundColor: "#FAFAFA" }}>
          <div className="flex justify-center gap-7">
            <FaStar /><FaStar /><FaStar /><FaStar /><CiStar />
          </div>
          <p className="p-5" style={{ color: "#737373" }}>
            {t('doctorDescription')}
          </p>
          <div className="flex gap-5 m-5">
            <img src="/src/assets/circle.png" alt="" />
            <div>
              <h3 className="font-bold" style={{ color: "#0090CF" }}>
                Regina Miles
              </h3>
              <p className="font-bold">{t('designer')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
