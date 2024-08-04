
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import UserRoutes from "./routes/users.js";
import reviewRoutes from "./routes/Rating.js";
import Search from "./routes/SearchImage.js";
import commentsRouter from "./routes/CommentRoute.js";
import UserExprence from "./routes/UserExprence.js";
import Guide from "./routes/Guideresponse.js";
import Driver from "./routes/DriverRoute.js";
import Feedback from './routes/Feedback.js'
import Video from "./controllers/VideosController.js";
import AdminRoute from "./routes/AdminRoute.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB database connected');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });


// // Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", UserRoutes);
app.use("/auth", authRoutes);
app.use("/api", reviewRoutes);
app.use("/add", Search);
app.use("/comments", commentsRouter);
app.use("/upload", UserExprence);
app.use("/guide", Guide);
app.use("/driver", Driver);
app.use("/Feedback", Feedback);
app.use("/video", Video);
app.use('/admin',AdminRoute)

// Start the server
app.listen(PORT, () => {
  console.log("Server listening on PORT ", PORT);
});
