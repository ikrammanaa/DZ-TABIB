import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./Login"; // Adjust the path to where your Login component is located
import { auth } from "../../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Mocking Firebase functions
jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
}));

describe("Login Component", () => {
  it("should render Google login button", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    const googleLoginButton = screen.getByText(/Log in with Google/i);
    expect(googleLoginButton).toBeInTheDocument();
  });

  it("should handle Google login successfully", async () => {
    // Mocking signInWithPopup response
    signInWithPopup.mockResolvedValueOnce({
      user: {
        displayName: "Test User",
      },
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    const googleLoginButton = screen.getByText(/Log in with Google/i);
    fireEvent.click(googleLoginButton);

    // Wait for the alert to be triggered after successful login
    await waitFor(() => {
      expect(screen.getByText("Welcome, Test User!")).toBeInTheDocument();
    });
  });

  it("should handle Google login failure", async () => {
    // Mocking signInWithPopup failure
    signInWithPopup.mockRejectedValueOnce(new Error("Google login failed"));

    render(
      <Router>
        <Login />
      </Router>
    );

    const googleLoginButton = screen.getByText(/Log in with Google/i);
    fireEvent.click(googleLoginButton);

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Google login failed. Please try again.")).toBeInTheDocument();
    });
  });

  it("should handle email login form submission", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByText(/Log in/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    // Check if the navigation happens (or any other expected behavior)
    // Here we're checking if the loading state gets triggered.
    expect(loginButton).toHaveTextContent("Logging in..");
  });

  it("should remember the email when checkbox is checked", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const rememberMeCheckbox = screen.getByLabelText(/Remember Me/i);
    fireEvent.click(rememberMeCheckbox);

    expect(rememberMeCheckbox.checked).toBe(true);
  });

  it("should show and hide password", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    const togglePasswordButton = screen.getByLabelText(/Show Password/i);

    // Initially, the password type should be 'password'
    expect(passwordInput.type).toBe("password");

    // Simulate showing the password
    fireEvent.click(togglePasswordButton);
    expect(passwordInput.type).toBe("text");

    // Simulate hiding the password
    fireEvent.click(togglePasswordButton);
    expect(passwordInput.type).toBe("password");
  });
});
