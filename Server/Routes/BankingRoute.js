const express = require("express");
const router = express.Router();
const BankController = require("../Controllers/BankinController");

// Routes
router.post("/insert", BankController.bankerRegistration); // Registration route
router.post("/login", BankController.bankerLogin);              // Login route
router.post("/transaction", BankController.DepositData);        // Transaction route
router.get("/balance", BankController.balanceDisplay);          // Balance display route
router.post("/sendOtp", BankController.sendOtp);           // Send OTP route
router.post("/resetpassword", BankController.resetPassword);




module.exports = router;