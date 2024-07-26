import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import multer from 'multer';
import { Router } from 'express';
import Video from '../models/Videosmodels.js'; // Ensure the path is correct

const router = Router();
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new GridFSBucket(conn.db, {
    bucketName: 'videos',
  });
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('video'), async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: 'No file provided' });
  }

  const videoId = new mongoose.Types.ObjectId();
  const uploadStream = gfs.openUploadStreamWithId(videoId, file.originalname, {
    contentType: file.mimetype,
  });

  uploadStream.end(file.buffer);

  uploadStream.on('finish', async () => {
    try {
      const video = new Video({
        _id: videoId,
        title,
        description,
        contentType: file.mimetype,
        filename: file.originalname,
      });

      await video.save();
      console.log('Video Metadata:', video); // Log the video metadata
      res.status(200).json({ success: true, message: 'Video uploaded successfully', video });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to save video metadata', error });
    }
  });

  uploadStream.on('error', (error) => {
    res.status(500).json({ success: false, message: 'Failed to upload video', error });
  });
});


router.get('/video/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Convert to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);
    

    // Check if the video metadata exists
    const video = await Video.findById(objectId);
    if (!video) {
      console.log('Video not found in metadata:', id);
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    const downloadStream = gfs.openDownloadStream(objectId);
    
    downloadStream.on('error', (error) => {
      res.status(500).json({ success: false, message: 'Error retrieving video', error });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving video:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve video' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    await gfs.delete(video._id);
    await Video.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ success: false, message: 'Failed to delete video' });
  }
});

router.get('/video', async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all video metadata from the Video collection
    res.json(videos);
  } catch (err) {
    res.status(500).send('An error occurred while fetching videos.');
  }
});

export default router;
