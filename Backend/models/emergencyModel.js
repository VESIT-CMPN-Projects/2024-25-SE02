const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencyAlertSchema = new Schema({
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
  location: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Active", "Resolved"],
    default: "Active",
  },
});

module.exports = mongoose.model("EmergencyAlert", emergencyAlertSchema);
