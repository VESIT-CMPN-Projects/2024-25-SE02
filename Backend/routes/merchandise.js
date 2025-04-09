const express = require("express");
const {
  getAllMerchandise,
  getMerchandiseById,
  addMerchandise,
  updateMerchandise,
  deleteMerchandise,
} = require("../controllers/merchandiseController");

const router = express.Router();

// Route to fetch all merchandise items
router.get("/", getAllMerchandise);

// Route to fetch a specific merchandise item by ID
router.get("/:id", getMerchandiseById);

// Route to add a new merchandise item
router.post("/", addMerchandise);

// Route to update a merchandise item by ID
router.put("/:id", updateMerchandise);

// Route to delete a merchandise item by ID
router.delete("/:id", deleteMerchandise);

module.exports = router;
