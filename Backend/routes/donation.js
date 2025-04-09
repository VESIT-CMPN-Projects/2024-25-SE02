const express = require("express");
const {
  getAllDonations,
  getDonationById,
  addDonation,
  deleteDonation,
} = require("../controllers/donationController");

const router = express.Router();

// Route to fetch all donations
router.get("/", getAllDonations);

// Route to fetch a specific donation by ID
router.get("/:id", getDonationById);

// Route to add a new donation
router.post("/", addDonation);

// Route to delete a donation by ID
router.delete("/:id", deleteDonation);

module.exports = router;
