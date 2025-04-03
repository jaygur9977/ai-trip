// In your backend (e.g., server.js or routes file)
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip'); // Make sure this matches the location of your Trip model

// Fetch all trips by user email
router.get('/api/trips/history/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail; // Get the userEmail from the route params

    // Find trips associated with the email
    const trips = await Trip.find({ userEmail });  // Assuming 'userEmail' is a field in your Trip schema
    
    // If no trips are found, send an empty array
    if (!trips || trips.length === 0) {
      return res.json([]);  // Return an empty array if no trips are found
    }

    // Send the trips as a response
    res.json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

module.exports = router;
