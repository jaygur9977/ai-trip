const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true }, 
  theme: { type: String, required: true }, 
  bestTimeToVisit: { type: String, required: true }, 
  places: [
    {
      placeName: { type: String, required: true },
      placeDetails: { type: String, required: true },
      ticketPricing: { type: String, required: true },
      rating: { type: Number, required: true },
      timeTravel: { type: String, required: true },
    },
  ],
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
});

module.exports = mongoose.model('Itinerary', itinerarySchema);