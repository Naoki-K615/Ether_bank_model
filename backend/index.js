const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const logger = require('./utils/logger');

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const mongoose = require("mongoose");

//database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bankdb";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
//e-ecommer server check

connection.once("open", () =>
  console.log("mongoDB connection eastablished succesfully")
);

connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

//middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  methods: ["GET", "DELETE", "PUT", "POST"],
  credentials: true
}));


//routes
const accounts = require("./route/accounts");
app.use("/accounts", accounts);
const transactions = require("./route/transactions");
app.use("/transactions", transactions);
app.use(logger.logRequest);
//acknoledge api
app.get("/", (req, res) =>
  res.json({ message: "Welcome you are in the main page :)" })
);

app.listen(PORT, "0.0.0.0", () =>{console.log(`your app is running on port ${PORT} enjoy developing`);});
