// import express from "express";
// import Guide from "../models/GuideavilableSchema.js";

// const router = express.Router();

// // POST Route to submit guide data
// router.post('/guide', async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { placeId,  time, price, hours, customPlace, userData } = req.body;

//     // Save the data to the database or perform necessary operations
//     // Example: Saving data to MongoDB
//     const guideData = await Guide.create({
//       placeId,
//       time,
//       price,
//       hours,
//       customPlace,
//       userData,
//     });

//     // Return the response
//     res.status(200).json({ success: true, guideData });
//   } catch (error) {
//     console.error("Error submitting guide data:", error);
//     res.status(500).json({ success: false, error: "Failed to submit guide data." });
//   }
// });

// // DELETE Route to delete guide data by user ID
// router.delete('/delete/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     console.log(`Received request to delete guides for userId: ${userId}`);

//     // Delete the data from the database where userData._id matches
//     const result = await Guide.deleteMany({ 'userData._id': userId });

//     if (result.deletedCount === 0) {
//       console.log(`No guide data found for userId: ${userId}`);
//       return res.status(404).json({ success: false, message: "No guide data found for the specified user." });
//     }

//     console.log(`Deleted guides for userId: ${userId}`);
//     // Return success response
//     res.status(200).json({ success: true, message: "Guide data deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting guide data:", error);
//     res.status(500).json({ success: false, error: "Failed to delete guide data." });
//   }
// });

// // GET Route to retrieve guide data
// router.get('/guide', async (req, res) => { // Changed route to accept placeId parameter
//   try {

//     // Fetch the guide data from the database or perform necessary operations
//     // Example: Fetching data from MongoDB
//     const guideData = await Guide.find();

//     // Return the response with guide data
//     res.status(200).json({ success: true, guideData });
//   } catch (error) {
//     console.error("Error fetching guide data:", error);
//     res.status(500).json({ success: false, error: "Failed to fetch guide data." });
//   }
// });

// export default router;
import express from "express";
import mongoose from "mongoose";
import Guide from "../models/GuideavilableSchema.js";

const router = express.Router();

// POST Route to submit guide data
router.post("/guide", async (req, res) => {
  try {
    // Extract data from the request body
    const { placeId, time, price, hours, customPlace, userData } = req.body;

    // Save the data to the database
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
    res
      .status(500)
      .json({ success: false, error: "Failed to submit guide data." });
  }
});

// DELETE Route to delete guide data by user ID
router.delete("/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete the data from the database where userData._id matches
    const result = await Guide.deleteMany({ "userData._id": userId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No guide data found for the specified user.",
        });
    }

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "Guide data deleted successfully." });
  } catch (error) {
    console.error("Error deleting guide data:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete guide data." });
  }
});

// GET Route to retrieve guide data
router.get("/guide", async (req, res) => {
  try {
    // Fetch the guide data from the database
    const guideData = await Guide.find();

    // Return the response with guide data
    res.status(200).json({ success: true, guideData });
  } catch (error) {
    console.error("Error fetching guide data:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch guide data." });
  }
});

export default router;
