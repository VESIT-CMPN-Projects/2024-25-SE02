const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Merchandise",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Order", orderSchema);
