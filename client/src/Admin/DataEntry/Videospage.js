import React, { useState } from 'react';
import axios from 'axios';
import Api from '../../Api';
const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [videos, setVideos] = useState([]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
    await axios.post(`${Api}/video/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // fetchVideos(); // Refresh the list of videos
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };



  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={handleFileChange} required />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default VideoUpload;
