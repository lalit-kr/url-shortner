require("dotenv").config();
const mongoose = require("mongoose");

// Mongo Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hjk9sp3.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
