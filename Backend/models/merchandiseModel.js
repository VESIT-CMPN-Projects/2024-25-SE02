const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merchandiseSchema = new Schema({
  item_name: {
    type: String,
    required: true,
  },
  item_type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Merchandise", merchandiseSchema);
