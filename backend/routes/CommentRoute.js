import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

// GET all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new comment
router.post("/", async (req, res) => {
  const {
    placeId,
    userId,
    comId,
    avatarUrl,
    userProfile,
    fullName,
    text,
    placeName,
  } = req.body;

  try {
    // Create a new Comment document
    const comment = new Comment({
      placeId,
      userId,
      comId,
      avatarUrl,
      userProfile,
      fullName,
      text,
      placeName,
    });

    // Save the comment to the database
    const newComment = await comment.save();

    // Respond with the newly created comment
    res.status(201).json(newComment);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
});

// DELETE a comment by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the comment by ID and delete it
    const deletedComment = await Comment.findByIdAndDelete(id);

    // If the comment doesn't exist, respond with a 404 status
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Respond with the deleted comment
    res.status(200).json({ message: "Comment deleted", deletedComment });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

export default router;
