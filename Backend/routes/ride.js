const express = require("express");
const {
  getAllRides,
  addRide,
  deleteRide,
  getRideById,
  updateRide,
} = require("../controllers/rideController");

const router = express.Router();

// Route to get all rides
router.get("/", getAllRides);

// Route to add a new ride
router.post("/add", addRide);

// Route to get a ride by ID
router.get("/:id", getRideById);

// Route to update a ride
router.put("/:id", updateRide);

// Route to delete a ride
router.delete("/:id", deleteRide);

module.exports = router;
