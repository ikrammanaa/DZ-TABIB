import { useState } from "react";
import { useTranslation } from "react-i18next"; // Importer useTranslation

const Forrm = () => {
  const { t } = useTranslation(); // Hook pour accéder aux traductions

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    topic: "",
    message: "",
    termsAccepted: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold m-10" style={{ color: "#013559" }}>
          {t("title")} {/* Utilisation de la traduction */}
        </h1>
        <p className="text-center">{t("description")}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="m-32 mt-16">
          <div className="h-20 flex justify-around gap-10">
            <div className="flex flex-col">
              <label htmlFor="first-name">{t("firstName")}</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t("placeholder.firstName")}
                className="w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last-name">{t("lastName")}</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t("placeholder.lastName")}
                className="w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
          </div>

          <div className="h-20 flex justify-around gap-10 mt-10">
            <div className="flex flex-col">
              <label htmlFor="email">{t("email")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("placeholder.email")}
                className="outline-none w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone-number">{t("phoneNumber")}</label>
              <input
                type="phone"
                id="phone-number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={t("placeholder.phoneNumber")}
                className="outline-none w-96 h-10 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
                required
              />
            </div>
          </div>

          <div className="select flex flex-col m-10 mt-10">
            <label htmlFor="medical-specialties">{t("topic")}</label>
            <select
              id="medical-specialties"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="outline-none h-12 p-2 rounded-lg border border-[#0090CF] w-full focus:outline-none focus:ring-[#0090CF]"
              required
            >
              <option value="">{t("placeholder.topic")}</option>
              <option value="Cardiology">{t("Cardiology")}</option>
              <option value="Dermatology">{t("Dermatology")}</option>
              {/* Ajoute d'autres traductions si nécessaire */}
            </select>
          </div>

          <div className="mssg flex flex-col m-10 ">
            <label htmlFor="message">{t("message")}</label>
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("placeholder.message")}
              className="outline-none w-full h-40 p-3 rounded border border-[#0090CF] focus:outline-none focus:ring-[#0090CF]"
              required
            />
          </div>

          <div className="flex ml-20 gap-5 ">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />{" "}
            {t("terms")}
          </div>

          <div className="m-5 w-full flex justify-center items-center">
            <button
              type="submit"
              className="w-80 py-3 mr-20 bg-[#0090CF] text-white rounded-lg hover:bg-[#007bb5]"
            >
              {t("submit")}
            </button>
          </div>
        </div>
      </form>

      {/* Popup de confirmation */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg w-80 text-center">
            <h2 className="font-bold text-xl mb-3">{t("thankYou")}</h2>
            <p>{t("response")}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 bg-[#0090CF] text-white px-4 py-2 rounded-lg"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forrm;
