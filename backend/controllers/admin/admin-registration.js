import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../../models/Adminschema.js'; // Adjust the path as needed

const storage = multer.memoryStorage();
const upload = multer({ storage });


export const register = async (req, res) => {
    const { username, email, password, mobileNumber, image } = req.body;
    
    try {
      // Check if email already exists
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new Admin({
        username,
        email,
        password: hashedPassword,
        mobileNumber,
        image, // Assuming image is base64 encoded
      });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error registering user:', error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: 'Validation error' });
      } else if (error.code === 11000) {
        res.status(400).json({ error: 'Duplicate key error' });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
    }
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send user data along with the token
      res.json({ token, data: user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      req.userId = decoded.userId;
      next();
    });
  };
  


