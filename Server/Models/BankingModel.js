const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number, // Store OTP as a number
  },
  otpExpiry: {
    type: Date, // Set an expiration time for the OTP
  },
}, { timestamps: true });

module.exports = mongoose.model("Bankingnew", BankSchema);
