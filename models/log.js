const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LOG = mongoose.model("log", logSchema);

module.exports = LOG;
