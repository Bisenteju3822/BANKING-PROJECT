import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_CONN from "../config";
import "./ResetPassword.css"; // Import the CSS file

const ResetPassword = () => {
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const id = localStorage.getItem("userid");

  // Password validation checks
  const isPasswordStrong = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(newpassword);
  };

  const handleSubmit = async () => {
    if (!oldpassword || !newpassword || !repassword) {
      toast.error("All fields are required!");
      return;
    }
    if (newpassword !== repassword) {
      toast.error("New password and confirmation password do not match!");
      return;
    }
    if (!isPasswordStrong()) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    setLoading(true); // Show loader during API call
    const api = `${BASE_CONN}/banking/resetpassword`;
    try {
      const response = await axios.post(api, {
        custId: id,
        oldpassword: oldpassword,
        newpassword: newpassword,
        repassword: repassword,
      });

      toast.success(response.data);
      setOldpassword("");
      setNewpassword("");
      setRepassword("");
    } catch (error) {
      toast.error(error.response?.data?.msg1 || "Something went wrong!");
    } finally {
      setLoading(false); // Hide loader after API call
    }
  };

  return (
    <>
      <div className="reset-password-container">
        <h2 className="reset-password-title">🔒 Reset Your Password</h2>
        <div className="reset-password-form">
          <label className="reset-label">Old Password</label>
          <input
            type="password"
            className="reset-input"
            value={oldpassword}
            onChange={(e) => setOldpassword(e.target.value)}
            placeholder="Enter Old Password"
          />

          <label className="reset-label">New Password</label>
          <input
            type="password"
            className="reset-input"
            value={newpassword}
            onChange={(e) => setNewpassword(e.target.value)}
            placeholder="Enter New Password"
          />
          {!isPasswordStrong() && newpassword && (
            <p className="password-strength">
              Password must be at least 8 characters, include uppercase,
              lowercase, a number, and a special character.
            </p>
          )}

          <label className="reset-label">Confirm New Password</label>
          <input
            type="password"
            className="reset-input"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            placeholder="Re-enter New Password"
          />

          <button
            className="reset-button"
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ResetPassword;
