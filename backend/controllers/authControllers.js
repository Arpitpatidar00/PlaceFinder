import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Arpit@007"; // Remember to hash this password in a real-world scenario

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      image,
      aadharNumber,
      certificationAddress,
      licenceNumber,
      aadharFile,
      certificationFile,
      licenceFile,
      Place,
      mobileNumber,
    } = req.body;

    // Check if user with the same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Save base64 encoded image data to the database
    const newUser = new User({
      username,
      email,
      password: hash,
      role,
      image, // Save the base64 encoded image data directly
      aadharNumber,
      certificationAddress,
      licenceNumber,
      aadharFile,
      certificationFile,
      licenceFile,
      Place,
      mobileNumber,
    });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
};
// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;

    // Check if the provided credentials match admin credentials
    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // If so, create a dummy admin user object
      user = { _id: "admin_id", role: "admin" };
    } else {
      // Otherwise, try to find the user in the database
      user = await User.findOne({ email });

      // If user doesn't exist, return error
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check password
      const checkCorrectPassword = await bcrypt.compare(
        password,
        user.password
      );

      // If password is incorrect, return error
      if (!checkCorrectPassword) {
        return res.status(401).json({
          success: false,
          message: "Incorrect Password or Email",
        });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Ensure 'role' is passed here
      process.env.JWT_SECRET_KEY,

      { expiresIn: "15d" }
    );

    // Set token in browser cookies and send response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days in milliseconds
      })
      .status(200)
      .json({
        token,
        data: { ...user }, // Removed _doc, as it's not required here
        role: user.role,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
