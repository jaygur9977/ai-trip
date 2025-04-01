const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI for a local instance
const uri = 'mongodb://localhost:27017';  // Local MongoDB instance URL

// MongoDB client setup
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// POST endpoint to save the trip data
app.post('/save-trip', async (req, res) => {
  try {
    const { formdata, tripData, userEmail } = req.body;

    // Check if the email is present
    if (!userEmail || !userEmail.includes('@')) {
      return res.status(400).json({ error: 'Invalid or missing email' });
    }

    await client.connect();

    const database = client.db('ai_trip_db');  // Name of the local database
    const tripsCollection = database.collection('trips');  // Name of the collection

    // Create a unique document ID (using current timestamp)
    const docId = Date.now().toString();

    // Prepare the document to insert
    const document = {
      userSelection: formdata,
      tripData: tripData,
      userEmail: userEmail,
      id: docId,
    };

    // Insert the document into MongoDB
    await tripsCollection.insertOne(document);

    res.status(200).json({ message: 'Trip data saved successfully!' });
  } catch (error) {
    console.error('Error saving trip data to MongoDB:', error);
    res.status(500).json({ error: 'Error saving trip data' });
  } finally {
    await client.close();
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
