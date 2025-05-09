const bankModel = require("../Models/BankingModel");
const autoPassword = require("../Middleware/autpass");
const nodemailer = require("nodemailer");
const TransactionModel = require("../Models/Transaction");

const bankerRegistration = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log("Registration Request Body:", req.body);

  try {
    if (password && password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    const generatedPassword = password || autoPassword.generatePassword();

    const bankerData = await bankModel.create({
      name,
      email,
      password: generatedPassword,
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing email credentials.");
    }

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
    console.log("Email sent successfully.");

    res.status(201).send({
      message: "Registration successful. Check your email for login credentials.",
    });
  } catch (error) {
    console.error("Error during registration:", error);

    if (error.code === 11000) {
      return res.status(400).send("Email is already registered.");
    }

    res.status(500).send("An error occurred during registration.");
  }
};

const bankerLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await bankModel.findOne({ email: email });
  try {
    if (!data) {
      return res.status(400).send("Invalid email");
    }
    if (data.password != password) {
      return res.status(400).send("Invalid password");
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

const DepositData = async (req, res) => {
  const { amount, status, customerid } = req.body;
  const data = await TransactionModel.create({
    amount: amount,
    status: status,
    customerid: customerid,
  });
  res.status(200).send(data);
};

const balanceDisplay = async (req, res) => {
  const { userid } = req.query;
  const data = await TransactionModel.find({ customerid: userid });
  res.status(200).send(data);
};
// Reset Password Controller


// Send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await bankModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing email credentials.");
    }




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
      subject: "Your OTP for Password Reset",
      text: `Dear User, your OTP for resetting your password is: ${otp}.`,
    };

    await transporter.sendMail(mailDetails);
    console.log("OTP email sent successfully.");

    res.status(200).send("OTP sent to your email.");
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("An error occurred while sending the OTP.");
  }
};

module.exports = {
  bankerRegistration,
  bankerLogin,
  DepositData,
  balanceDisplay,
  resetPassword,
  sendOtp
};
