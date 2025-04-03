const mongoose = require('mongoose');

const TravelPlanSchema = new mongoose.Schema({
  location: { type: String, required: true },
  totalDays: { type: Number, required: true },
  travelerType: { type: String, required: true },
  budget: { type: String, required: true },
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  itinerary: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }]
});

const TravelPlan = mongoose.model('TravelPlan', TravelPlanSchema);
module.exports = TravelPlan;
