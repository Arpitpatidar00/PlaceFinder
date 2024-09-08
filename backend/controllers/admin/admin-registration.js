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
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: admin.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set cookie with JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'Strict', // Adjust as needed (e.g., 'Lax' or 'None')
      maxAge: 3600000, // 1 hour
    });

    res.json({ msg: 'Admin logged in', token,admin });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Middleware to protect routes
export const authMiddleware = (req, res, next) => {
  // Access token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};