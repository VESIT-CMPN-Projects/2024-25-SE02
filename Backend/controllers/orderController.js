const Order = require("../models/orderModel");
const Merchandise = require("../models/merchandiseModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "name email")
      .populate("item_id", "item_name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user_id", "name email")
      .populate("item_id", "item_name price");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order details" });
  }
};

const addOrder = async (req, res) => {
  try {
    const { user_id, item_id, quantity } = req.body;

    // Fetch the item to calculate total price
    const item = await Merchandise.findById(item_id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const total_price = item.price * quantity;

    const newOrder = new Order({ user_id, item_id, quantity, total_price });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating order details" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ error: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
};
