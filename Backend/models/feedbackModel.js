const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
