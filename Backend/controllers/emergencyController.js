const EmergencyAlert = require("../models/emergencyModel");

const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await EmergencyAlert.find()
      .populate("user_id", "name email")
      .populate("ride_id", "ride_name start_location end_location");
    res.status(200).json(emergencies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emergency alerts" });
  }
};

const getEmergencyById = async (req, res) => {
  try {
    const emergency = await EmergencyAlert.findById(req.params.id)
      .populate("user_id", "name email")
      .populate("ride_id", "ride_name start_location end_location");
    if (!emergency)
      return res.status(404).json({ error: "Emergency alert not found" });
    res.status(200).json(emergency);
  } catch (error) {
    res.status(500).json({ error: "Error fetching emergency details" });
  }
};

const addEmergency = async (req, res) => {
  try {
    const { user_id, ride_id, location } = req.body;

    const newEmergency = new EmergencyAlert({ user_id, ride_id, location });
    await newEmergency.save();

    res.status(201).json(newEmergency);
  } catch (error) {
    res.status(500).json({ error: "Error submitting emergency alert" });
  }
};

const updateEmergencyStatus = async (req, res) => {
  try {
    const updatedEmergency = await EmergencyAlert.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedEmergency)
      return res.status(404).json({ error: "Emergency alert not found" });
    res.status(200).json(updatedEmergency);
  } catch (error) {
    res.status(500).json({ error: "Error updating emergency status" });
  }
};

const deleteEmergency = async (req, res) => {
  try {
    const deletedEmergency = await EmergencyAlert.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmergency)
      return res.status(404).json({ error: "Emergency alert not found" });
    res.status(200).json({ message: "Emergency alert deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting emergency alert" });
  }
};

module.exports = {
  getAllEmergencies,
  getEmergencyById,
  addEmergency,
  updateEmergencyStatus,
  deleteEmergency,
};
