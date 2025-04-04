import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import Infosection from '../components/Infosection';
import Place from '../components/Place';
import Footer from '../components/Footer';

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const response = await axios.get(`https://ai-trip-backend.onrender.com/api/trip/${tripId}`);
      setTrip(response.data); 
    } catch (error) {
      console.error('Error fetching trip data:', error);
      setError('Failed to fetch trip data. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; 
  }

  if (!trip) {
    return <p>No trip data found.</p>; 
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <Infosection trip={trip} />

      {/* <Hotel trip={trip} /> */}

      <Place trip={trip} />

      <Footer />
    </div>
  );
};

export default Viewtrip;
