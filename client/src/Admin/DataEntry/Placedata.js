import React, { useState } from 'react';
import axios from 'axios';
import './admin.css';

const Placedata = () => {
  const [formData, setFormData] = useState({
    cityName: '',
    placeName: '',
    title: '',
    image: null, 
    description: '',
  });

  const handleChange = async (e) => {
    const { name, type, files } = e.target;
    let updatedValue;

    if (type === 'file') {
      const file = files[0];

      // Convert the image file to base64
      const imageData = await convertToBase64(file);
      updatedValue = imageData;

      // Log the base64 data in the console
      console.log('Base64 Image Data:', imageData);
    } else {
      updatedValue = e.target.value;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the data object to send to the backend
      const dataToSend = {
        cityName: formData.cityName,
        placeName: formData.placeName,
        title: formData.title,
        image: formData.image, // Base64 encoded image data
        description: formData.description,
      };
  
      // Send the form data to the backend
      const response = await axios.post(`{Api}/add/upload`, dataToSend);
      console.log(response.data);
  
      // Reset form after submission
      setFormData({
        cityName: '',
        placeName: '',
        title: '',
        image: null,
        description: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file provided');
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="Placedata-container">
      <h2>Add New Place</h2>
      <form onSubmit={handleSubmit} className="Placedata-form">
        <div>
          <label htmlFor="cityName">City Name:</label>
          <input
            type="text"
            id="cityName"
            name="cityName"
            value={formData.cityName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="placeName">Place Name:</label>
          <input
            type="text"
            id="placeName"
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*" // Limit file input to images
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Placedata;
