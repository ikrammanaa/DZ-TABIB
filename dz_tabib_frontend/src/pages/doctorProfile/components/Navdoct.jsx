import { useTranslation } from "react-i18next"; // Import useTranslation

const Navdoct = () => {
  const { t, i18n } = useTranslation(); // Access translation and language switcher

  // Change language function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Update language globally
  };

  return (
    <div className="navbar w-full h-14 flex items-center justify-between px-4 bg-[#CDF5FD] shadow-md">
      <div className="logo">
        <img className="h-14" src="/src/assets/logo.png" alt="Logo" />
      </div>

      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <button
          onClick={() => changeLanguage("en")}
          className="px-3 py-1 rounded bg-[#0090CF] text-white hover:bg-[#007bb5]"
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("fr")}
          className="px-3 py-1 rounded bg-[#0090CF] text-white hover:bg-[#007bb5]"
        >
          FR
        </button>

        <div className="account-name flex items-center gap-4 text-right text-gray-700 font-semibold">
          <img className="h-12" src="/src/assets/doctor.png" alt={t("doctorImageAlt")} />
          <p>{t("doctorName")}</p>
        </div>
      </div>
    </div>
  );
};

export default Navdoct;
