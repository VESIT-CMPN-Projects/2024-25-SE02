const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  date_joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
