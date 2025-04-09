const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ride_id: {
    type: Schema.Types.ObjectId,
    ref: "Ride",
    required: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
