import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Use axios for API calls
import Infosection from '../components/Infosection';
import Hotel from '../components/Hotel';
import Place from '../components/Place';
import Footer from '../components/Footer';

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/trip/${tripId}`); // Fetch trip data from backend
      setTrip(response.data); // Set the trip data
    } catch (error) {
      console.error('Error fetching trip data:', error);
      setError('Failed to fetch trip data. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message
  }

  if (!trip) {
    return <p>No trip data found.</p>; // Handle case where trip data is not available
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information */}
      <Infosection trip={trip} />

      {/* Hotels */}
      {/* <Hotel trip={trip} /> */}

      {/* Daily Plans */}
      <Place trip={trip} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Viewtrip;