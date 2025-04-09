const express = require("express");
const {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Route to fetch all orders
router.get("/", getAllOrders);

// Route to fetch a specific order by ID
router.get("/:id", getOrderById);

// Route to place a new order
router.post("/", addOrder);

// Route to update an existing order
router.put("/:id", updateOrder);

// Route to delete an order
router.delete("/:id", deleteOrder);

module.exports = router;
