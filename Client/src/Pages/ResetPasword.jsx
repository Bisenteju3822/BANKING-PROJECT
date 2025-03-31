import React, { useState } from "react";
import axios from "axios";
import BASE_CONN from "../config"; // Replace with your API base URL configuration
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [step, setStep] = useState(1); // Track form step (OTP or Password Reset)
  const [loading, setLoading] = useState(false); // Track API loading state
  const [passwordStrength, setPasswordStrength] = useState("");

  // Function to send OTP
  const handleSendOtp = async () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${BASE_CONN}/banking/sendotp`, { email });
      toast.success("OTP sent to your email!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.response?.data?.message || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Function to reset the password
  const handleResetPassword = async () => {
    if (!otp || !newPassword || !rePassword) {
      toast.error("All fields are required!");
      return;
    }

    if (newPassword !== rePassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (passwordStrength !== "Strong") {
      toast.error("Your password must be stronger!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_CONN}/banking/resetpassword`, {
        email,
        otp,
        newPassword,
      });

      toast.success(response.data.message || "Password reset successful!");
      // Reset form
      setEmail("");
      setOtp("");
      setNewPassword("");
      setRePassword("");
      setStep(1); // Reset to initial step
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  // Function to evaluate password strength
  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      password.match(/[A-Z]/) &&qw
      password.match(/[a-z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[@$!%*?&]/)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Moderate");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Reset Password
        </h2>

        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter OTP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  evaluatePasswordStrength(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter new password"
              />
              <p
                className={`mt-1 text-sm ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Moderate"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Password Strength: {passwordStrength}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm new password"
              />
            </div>
            <button
              onClick={handleResetPassword}
              className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
