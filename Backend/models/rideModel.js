const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  ride_name: {
    type: String,
    required: true,
  },
  start_location: {
    type: String,
    required: true,
  },
  end_location: {
    type: String,
    required: true,
  },
  date_time: {
    type: Date,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
    min: 0,
  },
  organizer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Ride", rideSchema);
