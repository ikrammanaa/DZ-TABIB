import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';  // Import useTranslation

// LanguageSwitcher component
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change the language
  };

  return (
    <div className="language-switcher flex gap-3 items-center">
      <button onClick={() => handleLanguageChange('en')} className="px-2 py-1 text-sm">
        English
      </button>
      <button onClick={() => handleLanguageChange('fr')} className="px-2 py-1 text-sm">
        Français
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t } = useTranslation();  // Access translation function

  return (
    <nav style={{ backgroundColor: "#CDF5FD" }}>
      <div
        className="w-full flex justify-between items-center px-10 py-2"
        style={{ fontFamily: "montserrat" }}
      >
        <div className="logo">
          <img src="/src/assets/logo.png" alt="Logo" className="w-18 h-16" />
        </div>
        <div className="part2 flex gap-5">
          <Link to="/" className="text-base underline">
            {t('home')} {/* Translated "Home" */}
          </Link>
          <Link to="/contact" className="hover:underline">
            {t('contactUs')} {/* Translated "Contact Us" */}
          </Link>
        </div>
        <div className="part3 flex gap-6">
          <Link to="/login" style={{ color: "#0090CF" }} className="hover:underline">
            {t('login')} {/* Translated "Login" */}
          </Link>

          <Link to="/doctor/:id">
            <button
              className="flex items-center gap-2 w-22 px-1 h-8 rounded"
              style={{
                backgroundColor: "#0090CF",
                color: "#FFFFFF",
                fontFamily: "montserrat",
              }}
            >
              {t('joinUs')} <FaArrowRight /> {/* Translated "Join Us" */}
            </button>
          </Link>
        </div>
        {/* Add the LanguageSwitcher component here */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
