const express = require("express");
const {
  getAllRegistrations,
  getRegistrationById,
  addRegistration,
  updateRegistrationStatus,
  deleteRegistration,
} = require("../controllers/registrationController");

const router = express.Router();

router.get("/", getAllRegistrations);
router.get("/:id", getRegistrationById);
router.post("/", addRegistration);
router.put("/:id/status", updateRegistrationStatus);
router.delete("/:id", deleteRegistration);

module.exports = router;
