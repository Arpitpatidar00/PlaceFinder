// models/UserExprence.js
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageString: String,
  placeId: String,
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
