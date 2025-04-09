const express = require("express");
const {
  getAllEmergencies,
  getEmergencyById,
  addEmergency,
  updateEmergencyStatus,
  deleteEmergency,
} = require("../controllers/emergencyController");

const router = express.Router();

// Route to fetch all emergency alerts
router.get("/", getAllEmergencies);

// Route to fetch a specific emergency alert by ID
router.get("/:id", getEmergencyById);

// Route to report a new emergency alert
router.post("/", addEmergency);

// Route to update the status of an emergency alert
router.put("/:id", updateEmergencyStatus);

// Route to delete an emergency alert
router.delete("/:id", deleteEmergency);

module.exports = router;
