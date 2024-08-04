import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import multer from "multer";
import { Router } from "express";
import Video from "../models/Videosmodels.js"; // Ensure the path is correct
import { Readable } from "stream";

const router = Router();
const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "videos",
  });
  console.log("Connected to MongoDB");
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("video"), (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const readableVideoStream = Readable.from(req.file.buffer);

  const uploadStream = gfs.openUploadStream(req.file.originalname, {
    metadata: {
      title,
      description,
    },
  });

  readableVideoStream.pipe(uploadStream);

  uploadStream.on("finish", () => {
    res.status(201).send({
      message: "File uploaded successfully",
      fileId: uploadStream.id,
    });
  });

  uploadStream.on("error", (err) => {
    console.error("Upload Error:", err);
    res.status(500).send("An error occurred during file upload.");
  });
});

router.get("/video/:id", (req, res) => {
  const fileId = new mongoose.Types.ObjectId(req.params.id);

  gfs
    .openDownloadStream(fileId, { allowDiskUse: true })
    .on("error", (err) => {
      console.error("Download Error:", err);
      res.status(404).send("Video not found.");
    })
    .pipe(res)
    .on("error", (err) => {
      console.error("Stream Error:", err);
      res.status(500).send("An error occurred while streaming the video.");
    });
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    await gfs.delete(video._id);
    await Video.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ success: false, message: "Failed to delete video" });
  }
});

router.get("/video", async (req, res) => {
  try {
    const files = await conn.db.collection("videos.files").find().toArray();
    res.json(files);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).send("An error occurred while fetching videos.");
  }
});

export default router;
