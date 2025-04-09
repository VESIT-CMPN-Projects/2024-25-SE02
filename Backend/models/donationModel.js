const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  payment_method: {
    type: String,
    enum: ["Credit Card", "UPI", "Net Banking", "Cash"],
    required: true,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
