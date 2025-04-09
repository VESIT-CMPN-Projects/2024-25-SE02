const Ride = require("../models/rideModel");

const getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate("organizer_id", "name email");
    res.status(200).json({
      success: true,
      message: "Rides Fetched Successfully",
      data: rides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching rides",
      error,
    });
  }
};

const addRide = async (req, res) => {
  try {
    const {
      ride_name,
      start_location,
      end_location,
      date_time,
      distance,
      organizer_id,
    } = req.body;
    const newRide = new Ride({
      ride_name,
      start_location,
      end_location,
      date_time,
      distance,
      organizer_id,
    });
    await newRide.save();
    res.status(201).json({ message: "Ride added successfully", ride: newRide });
  } catch (error) {
    res.status(400).json({ message: "Error adding ride", error });
  }
};

const deleteRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const deletedRide = await Ride.findByIdAndDelete(rideId);
    if (!deletedRide)
      return res.status(404).json({ message: "Ride not found" });
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ride", error });
  }
};

const getRideById = async (req, res) => {
  try {
    const { rideId } = req.params;
    const ride = await Ride.findById(rideId).populate(
      "organizer_id",
      "name email"
    );
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ride details", error });
  }
};

const updateRide = async (req, res) => {
  try {
    const rideId = req.params.rideId;
    const updatedRide = await Ride.findByIdAndUpdate(rideId, req.body, {
      new: true,
    });
    if (!updatedRide)
      return res.status(404).json({ message: "Ride not found" });
    res
      .status(200)
      .json({ message: "Ride updated successfully", ride: updatedRide });
  } catch (error) {
    res.status(500).json({ message: "Error updating ride", error });
  }
};

module.exports = { getAllRides, addRide, deleteRide, getRideById, updateRide };
