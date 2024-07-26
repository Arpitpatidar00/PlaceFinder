import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
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
    type:JSON,
    required: true
  }
}, { timestamps: true });

const Guide = mongoose.model('Guide', guideSchema);

export default Guide;
