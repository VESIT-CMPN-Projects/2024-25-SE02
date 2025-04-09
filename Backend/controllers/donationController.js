const Donation = require("../models/donationModel");

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("user_id", "name email");
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "user_id",
      "name email"
    );
    if (!donation) return res.status(404).json({ error: "Donation not found" });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ error: "Error fetching donation details" });
  }
};

const addDonation = async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ error: "Error adding donation" });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
    if (!deletedDonation)
      return res.status(404).json({ error: "Donation not found" });
    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting donation" });
  }
};

module.exports = {
  getAllDonations,
  getDonationById,
  addDonation,
  deleteDonation,
};
