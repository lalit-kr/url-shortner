require("dotenv").config();
const mongoose = require("mongoose");

// Mongo Connection
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
