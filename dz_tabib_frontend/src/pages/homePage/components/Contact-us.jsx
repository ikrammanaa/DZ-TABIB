import { useState } from "react";
import { useTranslation } from 'react-i18next';  // Import useTranslation

const ContactUs = () => {
  const { t } = useTranslation();  // Access translation function
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false); // New state for confirmation

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message:", message);

    // Simulate sending the message (e.g., make API call)
    setTimeout(() => {
      setMessage(""); // Clear the message field after submission
      setIsSent(true); // Set confirmation state to true
    }, 1000); // Simulate a delay for submission
  };

  return (
    <div
      className="m-10 p-10 flex flex-col items-center justify-center rounded-xl"
      style={{ backgroundColor: "#CDF5FD" }}
    >
      <h1
        className="p-3 text-3xl font-bold c-slate-700"
        style={{ color: "#252B42" }}
      >
        {t('contactUs')} {/* Translate the title */}
      </h1>
      <p className="text-center mb-5">
        {t('contactDescription')} {/* Translate the description */}
      </p>
      {!isSent ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            placeholder={t('yourMessage')}  // Translate the placeholder
            className="w-96 outline-none mt-5 p-3 rounded border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="m-3 h-10 px-6 rounded"
            style={{ backgroundColor: "#0090CF", color: "#FFFFFF" }}
          >
            {t('send')} {/* Translate the button text */}
          </button>
        </form>
      ) : (
        <div className="text-center mt-5">
          <p className="text-xl font-semibold text-green-600">
            {t('messageSent')} {/* Translate the success message */}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
