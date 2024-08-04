import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  image: { type: String },
  role: { type: String, default: 'admin' } // Set default role to 'admin'
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
