import express from "express";
import Driver from "../models/Driverschema.js";

const router = express.Router();

// POST Route to submit guide data
router.post('/driver', async (req, res) => {
  try {
    const { placeId, time, price, hours, customPlace, userData } = req.body;
    const driverData = await Driver.create({ // Use Driver model instead of Guide
      placeId,
      time,
      price,
      hours,
      customPlace,
      userData,
    });
    res.status(200).json({ success: true, driverData }); // Send success response
  } catch (error) {
    console.error("Error submitting driver data:", error);
    res.status(500).json({ success: false, error: "Failed to submit driver data." });
  }
});

// DELETE Route to delete driver data
router.delete('/delete/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    await Driver.deleteOne({ _id: placeId });
    res.status(200).json({ success: true, message: "Driver data deleted successfully." });
  } catch (error) {
    console.error("Error deleting driver data:", error);
    res.status(500).json({ success: false, error: "Failed to delete driver data." });
  }
});

// GET Route to retrieve driver data
router.get('/driver', async (req, res) => {
  try {
    const driverData = await Driver.find();
    res.status(200).json({ success: true, driverData });
  } catch (error) {
    console.error("Error fetching driver data:", error);
    res.status(500).json({ success: false, error: "Failed to fetch driver data." });
  }
});

export default router;
