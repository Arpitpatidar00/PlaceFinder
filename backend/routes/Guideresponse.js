import express from "express";
import Guide from "../models/GuideavilableSchema.js";

const router = express.Router();

// POST Route to submit guide data
router.post('/guide', async (req, res) => {
  try {
    // Extract data from the request body
    const { placeId,  time, price, hours, customPlace, userData } = req.body;

    // Save the data to the database or perform necessary operations
    // Example: Saving data to MongoDB
    const guideData = await Guide.create({
      placeId,
      time,
      price,
      hours,
      customPlace,
      userData,
    });

    // Return the response
    res.status(200).json({ success: true, guideData });
  } catch (error) {
    console.error("Error submitting guide data:", error);
    res.status(500).json({ success: false, error: "Failed to submit guide data." });
  }
});

// DELETE Route to delete guide data
router.delete('/delete/:placeId', async (req, res) => { // Changed route to accept placeId parameter
  try {
    const { placeId } = req.params;

    // Delete the data from the database or perform necessary operations
    // Example: Deleting data from MongoDB
    await Guide.deleteOne({ _id: placeId });

    // Return success response
    res.status(200).json({ success: true, message: "Guide data deleted successfully." });
  } catch (error) {
    console.error("Error deleting guide data:", error);
    res.status(500).json({ success: false, error: "Failed to delete guide data." });
  }
});

// GET Route to retrieve guide data
router.get('/guide', async (req, res) => { // Changed route to accept placeId parameter
  try {

    // Fetch the guide data from the database or perform necessary operations
    // Example: Fetching data from MongoDB
    const guideData = await Guide.find();

    // Return the response with guide data
    res.status(200).json({ success: true, guideData });
  } catch (error) {
    console.error("Error fetching guide data:", error);
    res.status(500).json({ success: false, error: "Failed to fetch guide data." });
  }
});

export default router;
