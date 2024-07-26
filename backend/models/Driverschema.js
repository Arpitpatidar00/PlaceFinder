import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
  placeId: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hours: {
    type: Number,
    required: true
  },
  customPlace: {
    type: String,
    required: true
  },
  userData: {
    type: mongoose.Schema.Types.Mixed, // Use mongoose.Schema.Types.Mixed for JSON data
    required: true
  }
}, { timestamps: true });

const Driver = mongoose.model('Driver', DriverSchema); // Use 'Driver' as the model name

export default Driver;
