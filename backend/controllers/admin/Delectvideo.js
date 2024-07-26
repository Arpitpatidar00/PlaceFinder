import mongoose from "mongoose";
import { gfs } from "../VideosController.js"; // Import gfs from videos.js
import Video from "../../models/Videosmodels.js";

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    await gfs.delete(video.filename);

    await Video.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ success: false, message: "Failed to delete video" });
  }
};
