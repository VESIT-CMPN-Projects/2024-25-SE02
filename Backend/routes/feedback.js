const express = require("express");
const {
  getAllFeedbacks,
  getFeedbackById,
  addFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

// Route to fetch all feedback
router.get("/", getAllFeedbacks);

// Route to fetch specific feedback by ID
router.get("/:id", getFeedbackById);

// Route to submit new feedback
router.post("/", addFeedback);

// Route to update existing feedback
router.put("/:id", updateFeedback);

// Route to delete feedback
router.delete("/:id", deleteFeedback);

module.exports = router;
