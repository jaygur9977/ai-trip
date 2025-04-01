const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true }, // Day number (e.g., Day 1, Day 2)
  theme: { type: String, required: true }, // Theme of the day (e.g., "Iconic Landmarks")
  bestTimeToVisit: { type: String, required: true }, // Best time to visit (e.g., "Morning")
  places: [
    {
      placeName: { type: String, required: true },
      placeDetails: { type: String, required: true },
      ticketPricing: { type: String, required: true },
      rating: { type: Number, required: true },
      timeTravel: { type: String, required: true },
    },
  ],
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }, // Reference to the Trip
});

module.exports = mongoose.model('Itinerary', itinerarySchema);