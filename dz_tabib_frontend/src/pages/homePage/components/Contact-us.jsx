import { useState } from "react";

const ContactUs = () => {
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
        Contact Us
      </h1>
      <p className="text-center mb-5">
        Problems trying to resolve the conflict between <br />
        the two major realms of Classical physics: Newtonian mechanics
      </p>
      {!isSent ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            placeholder="Your message"
            className="w-96 outline-none mt-5 p-3 rounded border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></input>
          <button
            type="submit"
            className="m-3 h-10 px-6 rounded"
            style={{ backgroundColor: "#0090CF", color: "#FFFFFF" }}
          >
            Send
          </button>
        </form>
      ) : (
        <div className="text-center mt-5">
          <p className="text-xl font-semibold text-green-600">Your message has been sent!</p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
