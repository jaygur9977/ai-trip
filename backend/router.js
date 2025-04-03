
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/api/trips/history/:userEmail', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    const trips = await Trip.find({ userEmail }); 
    if (!trips || trips.length === 0) {
      return res.json([]);  
    }
    res.json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

module.exports = router;
