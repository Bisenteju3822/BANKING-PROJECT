const express = require("express");
const router = express.Router();
const BankController = require("../Controllers/BankinController");

// Routes
router.post("/insert", BankController.bankerRegistration); // For registration
router.post("/login", BankController.bankerLogin); // For login
router.post("/transaction", BankController.DepositData); // For deposit/transactions
router.get("/balance", BankController.balanceDisplay); // To fetch balance/transactions
router.post("/reset-password", BankController.resetPassword); // For resetting password

module.exports = router;
