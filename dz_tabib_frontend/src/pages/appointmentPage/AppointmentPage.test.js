import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppointmentPage } from "./AppointmentPage"; // Adjust path as needed

const mockDoctor = {
  id: 1,
  name: "Dr. John Doe",
  specialization: "Cardiologist",
  location: "Algiers",
  availability: {
    "2025-02-01": ["10:00 AM", "02:00 PM", "04:00 PM"],
    "2025-02-02": ["09:00 AM", "11:00 AM", "03:00 PM"],
  },
};

describe("AppointmentPage", () => {
  it("should allow selecting a date and time", async () => {
    render(
      <Router>
        <AppointmentPage />
      </Router>
    );

    // Simulate receiving doctor data
    const { state } = { state: { doctor: mockDoctor } };

    // Check if the doctor name is rendered
    expect(screen.getByText("Dr. John Doe")).toBeInTheDocument();

    // Find the available date and click it
    const dateButton = screen.getByText("2025-02-01");
    fireEvent.click(dateButton);

    // Check if the available times for the selected date are rendered
    await waitFor(() => screen.getByText("10:00 AM"));
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("02:00 PM")).toBeInTheDocument();
    expect(screen.getByText("04:00 PM")).toBeInTheDocument();

    // Click on a time slot
    const timeButton = screen.getByText("02:00 PM");
    fireEvent.click(timeButton);

    // Verify that the time has been selected
    expect(timeButton).toHaveClass("bg-sky-500 text-white");
  });
});
