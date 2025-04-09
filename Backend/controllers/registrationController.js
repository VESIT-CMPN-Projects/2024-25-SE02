const Registration = require("../models/registrationModel");

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user_id", "name email")
      .populate("ride_id", "ride_name date_time");
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};

const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate("user_id", "name email")
      .populate("ride_id", "ride_name date_time");
    if (!registration)
      return res.status(404).json({ error: "Registration not found" });
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ error: "Error fetching registration details" });
  }
};

const addRegistration = async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(500).json({ error: "Error adding registration" });
  }
};

const updateRegistrationStatus = async (req, res) => {
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedRegistration)
      return res.status(404).json({ error: "Registration not found" });
    res.status(200).json(updatedRegistration);
  } catch (error) {
    res.status(500).json({ error: "Error updating registration status" });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRegistration)
      return res.status(404).json({ error: "Registration not found" });
    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting registration" });
  }
};

module.exports = {
  getAllRegistrations,
  getRegistrationById,
  addRegistration,
  updateRegistrationStatus,
  deleteRegistration,
};
