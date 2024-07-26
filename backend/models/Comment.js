// backend/models/Comment.js
import mongoose from "mongoose";

// Comment model
const commentSchema = new mongoose.Schema({
  placeId: { type: String, required: true },
  userId: { type: String }, // Update to include userId
  comId: { type: String }, // Add comId field
  avatarUrl: { type: String }, // Add avatarUrl field
  userProfile: { type: String }, // Add userProfile field
  fullName: { type: String }, // Add fullName field
  text: { type: String, required: true },
  placeName:{type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
