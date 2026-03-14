const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  vehicletype: {
    type: String,
    enum: ['Car', 'Suv', 'Van'],
    default: 'Car',
    required: true
  },

  brand: {
    type: String,
    trim: true,
    required: true
  },

  model: {
    type: String,
    trim: true,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  fueltype: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    required: true
  },

  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    required: true
  },

  seats: {
    type: Number,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  priceperday: {
    type: Number,
    required: true
  },

  priceperweek: {
    type: Number,
    required: true
  },

  pricepermonth: {
    type: Number,
    required: true
  },

  features: {
    type: [String],
    required: true
  },

  image: {
    type: [String],
    default: [
      "https://images.icon-icons.com/157/PNG/256/user_22110.png",
      "https://wallpapers.com/images/high/cool-car-pictures-1440-x-900-0452k4b157vgkw3e.webp"
    ]
  },

  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Reject'],
    default: 'Pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('vehicle', vehicleSchema);
