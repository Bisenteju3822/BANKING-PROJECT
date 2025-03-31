import React, { useState } from "react";
import axios from "axios";
import BASE_CONN from "../config"; // Replace with your API bas

const SendOtp = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_CONN}/banking/sendOtp`, {
        email,
      });
      setMessage(response.data.message || "OTP sent successfully!");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Send OTP</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <button onClick={handleSendOtp} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SendOtp;
