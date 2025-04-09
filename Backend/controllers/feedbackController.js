const Feedback = require("../models/feedbackModel");

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user_id", "name email")
      .populate("ride_id", "ride_name start_location end_location");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("user_id", "name email")
      .populate("ride_id", "ride_name start_location end_location");
    if (!feedback) return res.status(404).json({ error: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: "Error fetching feedback details" });
  }
};

const addFeedback = async (req, res) => {
  try {
    const { user_id, ride_id, rating, comments } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const newFeedback = new Feedback({ user_id, ride_id, rating, comments });
    await newFeedback.save();

    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback" });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFeedback)
      return res.status(404).json({ error: "Feedback not found" });
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ error: "Error updating feedback details" });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback)
      return res.status(404).json({ error: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting feedback" });
  }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  addFeedback,
  updateFeedback,
  deleteFeedback,
};
