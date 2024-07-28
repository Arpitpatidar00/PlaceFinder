import express from "express";
import Image from "../models/UserExprence.js";

const router = express.Router();

// POST route to upload an image
router.post("/", async (req, res) => {
  try {
    const { imageString, placeId, userData } = req.body;  // Add userId

    const image = new Image({
      imageString,
      placeId,
      userData  // Add userId
    });

    await image.save();

    res.status(200).json({ message: "Image string uploaded successfully", image});
  } catch (error) {
    console.error("Error uploading image string:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch all images
router.get("/uploadedImages", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// GET route to fetch images by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;  // Get userId from URL params
    const images = await Image.find({ userData: userId });  // Find images by userData

    if (images.length === 0) {
      return res.status(404).json({ message: "No images found for this user" });
    }
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
