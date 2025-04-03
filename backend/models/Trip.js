const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userselection: { type: Object, required: true }, 
  tripdata: { type: Object, required: true },
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Trip', tripSchema);