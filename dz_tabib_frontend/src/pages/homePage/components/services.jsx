import { useTranslation } from 'react-i18next'; // Import useTranslation

const Services = () => {
  const { t } = useTranslation();  // Access translation function

  return (
    <div style={{ fontFamily: "montserrat" }}>
      <div className="statstics flex justify-around items-center px-10 py-10">
        <div className="1">
          <h1 className='text-4xl font-bold' style={{ color: "#0090CF" }}>15K</h1>
          <p className='text-2xl'>{t('happyCustomers')}</p> {/* Translate the text */}
        </div>
        <div className="2">
          <h1 className='text-4xl font-bold' style={{ color: "#0090CF" }}>150K</h1>
          <p className='text-2xl'>{t('monthlyVisitors')}</p> {/* Translate the text */}
        </div>
        <div className="3">
          <h1 className='text-4xl font-bold' style={{ color: "#0090CF" }}>15</h1>
          <p className='text-2xl'>{t('countriesWorldwide')}</p> {/* Translate the text */}
        </div>
        <div className="4">
          <h1 className='text-4xl font-bold' style={{ color: "#0090CF" }}>100+</h1>
          <p className='text-2xl'>{t('topPartners')}</p> {/* Translate the text */}
        </div>
      </div>
      <div className="our-srv">
        <div>
          <h1 className="ml-40 text-3xl p-5 font-bold" style={{ color: "#013559" }}>{t('ourServices')}</h1> {/* Translate the text */}
          <p className="ml-40 p-5">{t('servicesDescription')}</p> {/* Translate the text */}
        </div>
        <div className="flex justify-center gap-20 mt-20">
          <div className="p-8 shadow-2xl" style={{ backgroundColor: "#CDF5FD" }}>
            <img src="/src/assets/circle sec-.png" alt="" />
            <h3 className="p-3 font-bold">{t('quickExamination')}</h3> {/* Translate the text */}
            <hr className="ml-5 m-3" style={{ border: "1px solid #0090CF", width: "40%" }} />
            <p className="p-3">{t('quickExaminationDescription')}</p> {/* Translate the text */}
          </div>
          <div className="p-8 shadow-2xl" style={{ backgroundColor: "#CDF5FD" }}>
            <img src="/src/assets/circle sec2-.png" alt="" />
            <h3 className="p-3 font-bold">{t('quickExamination')}</h3> {/* Translate the text */}
            <hr className="ml-5 m-3" style={{ border: "1px solid #0090CF", width: "40%" }} />
            <p>{t('quickExaminationDescription')}</p> {/* Translate the text */}
          </div>
          <div className="p-8 shadow-2xl" style={{ backgroundColor: "#CDF5FD" }}>
            <img src="/src/assets/circle sec3-.png" alt="" />
            <h3 className="p-3 font-bold">{t('painlessProcedures')}</h3> {/* Translate the text */}
            <hr className="ml-5 m-3" style={{ border: "1px solid #0090CF", width: "40%" }} />
            <p>{t('painlessProceduresDescription')}</p> {/* Translate the text */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
