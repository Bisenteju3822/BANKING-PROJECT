require("dotenv").config();
const mongoose = require("mongoose");

const database = () => {
   mongoose.connect(process.env.DB_CONNECT)
      .then(() => {
         console.log("Successfully connected to MongoDB");
      })
      .catch((error) => {
         console.error("Error in DB connection:", error);
      });
};

module.exports = database;
