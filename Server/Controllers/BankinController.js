const bankModel = require("../Models/BankingModel");
const autoPassword = require("../Middleware/autpass");
const nodemailer = require("nodemailer");
const TransactionModel = require("../Models/Transaction");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register New Banker
const bankerRegistration = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password && password !== confirmPassword) {
      return res.status(400).json({ status: "error", message: "Passwords do not match." });
    }

    const generatedPassword = password || autoPassword.generatePassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10); // Hash the password

    const bankerData = await bankModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailDetails = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "E-Banking Registration",
      text: `Dear ${name}, your account has been successfully created.\nYour password is: ✅✅✅✅ ${generatedPassword}`,
    };

    await transporter.sendMail(mailDetails);

    res.status(201).json({ status: "success", message: "Registration successful. Check your email for login credentials." });
  } catch (error) {
    console.error("Error during registration:", error);

    if (error.code === 11000) {
      return res.status(400).json({ status: "error", message: "Email is already registered." });
    }

    res.status(500).json({ status: "error", message: "An error occurred during registration." });
  }
};

// Login
const bankerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await bankModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", message: "Invalid email" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); // Compare hashed password
    if (!isPasswordCorrect) {
      return res.status(400).json({ status: "error", message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Generate JWT
    res.status(200).json({ status: "success", message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred during login." });
  }
};

// Deposit Data
const DepositData = async (req, res) => {
  const { amount, status, customerid } = req.body;

  try {
    const data = await TransactionModel.create({ amount, status, customerid });
    res.status(200).json({ status: "success", message: "Transaction recorded successfully", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred while processing the transaction." });
  }
};

// Balance Display
const balanceDisplay = async (req, res) => {
  const { userid } = req.query;

  try {
    const data = await TransactionModel.find({ customerid: userid });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred while retrieving balance data." });
  }
};

// Send OTP for Password Reset
const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await bankModel.findOne({ email });
    if (!user) return res.status(404).json({ status: "error", message: "User not found." });

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailDetails = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is: ${otp}. This OTP is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailDetails);
    res.status(200).json({ status: "success", message: "OTP has been sent to your email." });
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred while sending OTP." });
  }
};

// Reset Password with OTP
const resetPasswordWithOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await bankModel.findOne({ email });
    if (!user) return res.status(404).json({ status: "error", message: "User not found." });

    if (user.resetOtp !== otp || Date.now() > user.resetOtpExpiry) {
      return res.status(400).json({ status: "error", message: "Invalid or expired OTP." });
    }

    user.password = await bcrypt.hash(newPassword, 10); // Hash new password
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    res.status(200).json({ status: "success", message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ status: "error", message: "An error occurred while resetting the password." });
  }
};

module.exports = {
  bankerRegistration,
  bankerLogin,
  DepositData,
  balanceDisplay,
  sendResetOtp,
  resetPasswordWithOtp,
};
