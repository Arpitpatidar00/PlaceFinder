// models/UserExprence.js
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imageString: { type: String, required: true },
  placeId: { type: String, required: true },
  userData: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }  // Add this line
});

export default mongoose.model("Image", ImageSchema);

