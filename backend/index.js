const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Models
const Trip = require('./models/Trip');
const Hotel = require('./models/Hotel');
const Itinerary = require('./models/Itinerary');

// Initialize express app
const app = express();

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoUri = 'mongodb://127.0.0.1:27017/AI-trip';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes

// Create a new Trip document
app.post('/api/trip', async (req, res) => {
  const { userselection, tripdata, userEmail } = req.body;

  // Validate required fields
  if (!userEmail || !userselection || !tripdata) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  try {
    const newTrip = new Trip({ userselection, tripdata, userEmail });
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// Fetch trip data by ID
app.get('/api/trip/:tripId', async (req, res) => {
  const { tripId } = req.params;

  try {
    // Fetch trip data from MongoDB
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(trip); // Return the trip data
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});