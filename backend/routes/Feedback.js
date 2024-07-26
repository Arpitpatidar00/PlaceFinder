// routes/feedback.js

import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST route to store feedback
router.post("/", async (req, res) => {
  try {
    const { feedback, userData } = req.body;

    // Create a new feedback instance
    const newFeedback = new Feedback({
      feedback,
      userData,
      createdAt: new Date(), // Store current timestamp
    });

    // Save the feedback to the database
    await newFeedback.save();

    res.status(201).json({ message: "Feedback stored successfully" });
  } catch (error) {
    console.error("Error storing feedback:", error);
    res.status(500).json({ message: "Failed to store feedback" });
  }
});

// GET route to get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

// DELETE route to delete feedback by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Feedback.findByIdAndDelete(id);
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Failed to delete feedback" });
  }
});

export default router;
