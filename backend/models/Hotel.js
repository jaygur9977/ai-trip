const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  hotelAddress: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }, // Reference to the Trip
});

module.exports = mongoose.model('Hotel', hotelSchema);