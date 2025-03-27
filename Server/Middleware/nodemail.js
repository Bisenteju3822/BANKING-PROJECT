const nodemailer = require("nodemailer");
require("dotenv").config();

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Environment variables EMAIL_USER or EMAIL_PASS are missing. Check your .env file.");
}

// Create transporter instance
const NodeMailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendMail = async (mailDetails) => {
  try {
    // Validate email details
    if (!mailDetails || !mailDetails.to || !mailDetails.subject || !mailDetails.text) {
      throw new Error("Missing required mail details: to, subject, or text.");
    }

    // Set default sender if not provided
    mailDetails.from = mailDetails.from || `"Default Sender" <${process.env.EMAIL_USER}>`;

    const info = await NodeMailer.sendMail(mailDetails);
    console.log("Email successfully sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error while sending email:", error.message);
    throw error;
  }
};

module.exports = { sendMail };
