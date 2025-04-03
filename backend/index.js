const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const Trip = require('./models/Trip');

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoUri = process.env.MONGO_URI;


mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected to Atlas'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.post('/api/trip', async (req, res) => {
  const { userselection, tripdata, userEmail } = req.body;

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

app.get('/api/trip/:tripId', async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(trip); 
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
