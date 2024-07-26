import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageName: { type: String, required: true }, // Name of the image
  imageData: { type: Buffer, required: true }, // Store image data as Buffer
  contentType: { type: String, required: true } // Content type of the image
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
