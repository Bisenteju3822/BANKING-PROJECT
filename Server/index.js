require("dotenv").config();
const express = require("express");
const database = require("./Db");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const route = require("./Routes/BankingRoute");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

database();


app.use("/banking", route);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is correctly connected and running on port ${PORT}`);
});
