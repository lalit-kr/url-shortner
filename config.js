const mongoose = require("mongoose");

// Mongo Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
