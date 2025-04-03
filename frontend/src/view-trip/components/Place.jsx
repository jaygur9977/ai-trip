

import React, { useEffect, useState } from 'react';

const PlaceCard = ({ place }) => {

  const placeName = place.placeName || place.place_name || place.name || "Unnamed Place";
  const placeDetails = place.placeDetails || place.place_details || place.details || "No details available";
  const ticketPricing = place.ticketPricing || place.ticket_pricing || place.price || "Free";
  const timeTravel = place.travelTime || place.time_travel || place.travel_time;
  const rating = place.rating;
  const bestTimeToVisit = place.bestTimeToVisit || place.best_time_to_visit;
  const [imageUrl, setImageUrl] = useState(null);
  


  const openPlaceInMaps = () => {
    const query = encodeURIComponent(placeName);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const placeName = place.placeName || place.place_name || place.name;
        if (placeName) {
          const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(placeName)}&pithumbsize=500&origin=*`
          );
          const data = await response.json();
          const page = Object.values(data.query.pages)[0];
          if (page.thumbnail) {
            setImageUrl(page.thumbnail.source);
          }
        }
      } catch (error) {
        console.error("Error fetching Wikipedia image:", error);
      }
    };

    fetchImage();
  }, [place]);



  return (
    <div 
      className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={openPlaceInMaps}
    >
    
    <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl || "data:image/jpeg;base64,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"} 
          alt={placeName} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/jpeg;base64,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";
          }}
        />
      </div>
  
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold">{placeName}</h3>
        <p className="mt-2 text-gray-600">
          💰 Ticket Price: {ticketPricing}
        </p>
        {rating && (
          <p className="mt-2 text-gray-600">
            <span className="font-bold">⭐</span> {rating}
          </p>
        )}
        <p className="mt-2 text-gray-600 text-sm">
          {placeDetails}
        </p>
        {timeTravel && (
          <p className="mt-2 text-gray-600 text-sm">
            🚗 Travel Time: {timeTravel}
          </p>
        )}
        {bestTimeToVisit && (
          <p className="mt-2 text-gray-600 text-sm">
            ⏰ Best Time: {bestTimeToVisit}
          </p>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <p className="text-white text-lg font-semibold">View on Map</p>
      </div>
    </div>
  );
};

const Place = ({ trip }) => {

  const tripData = trip?.tripdata;

  if (!tripData || !Array.isArray(tripData)) {
    return (
      <div className="mt-12 p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">No valid trip data available. Please check the data structure.</p>
      </div>
    );
  }

  const tripInfo = trip?.userselection || {};
  const { location, days, budget, traveler } = tripInfo;

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold mb-4">Places to Visit</h3>

      {tripData.map((dayPlan) => {
        if (!dayPlan || typeof dayPlan !== 'object') {
          console.warn("Invalid day plan structure:", dayPlan);
          return null;
        }

        const dayNumber = dayPlan.day || 'Unknown Day';
        const dayLocation = dayPlan.location;
        const dayTheme = dayPlan.theme;

        let timeSlots = [];
        let placesArray = [];
        
        if (dayPlan.morning || dayPlan.afternoon || dayPlan.evening) {
          timeSlots = [
            { time: 'Morning', data: dayPlan.morning },
            { time: 'Afternoon', data: dayPlan.afternoon },
            { time: 'Evening', data: dayPlan.evening }
          ].filter(slot => slot.data);
        } 
        else if (Array.isArray(dayPlan.itinerary) || Array.isArray(dayPlan.itinerarys) || 
                 Array.isArray(dayPlan.plan) || Array.isArray(dayPlan.plans) || 
                 Array.isArray(dayPlan.locations) ||
                 Array.isArray(dayPlan.places_to_visit)|| Array.isArray(dayPlan.places_to_visits) || Array.isArray(dayPlan.activities)|| Array.isArray(dayPlan.activitie)) {
          placesArray = dayPlan.itinerary || dayPlan.itinerarys || 
                       dayPlan.plan || dayPlan.plans || 
                       dayPlan.locations || dayPlan.places_to_visit|| dayPlan.activities||
                       dayPlan.activitie|| [];
        }

        return (
          <div key={dayNumber} className="mb-8">
            <h1 className="text-xl font-bold mb-2 mt-8">Day {dayNumber}</h1>
            {dayLocation && <p className="text-blue-600 mb-1">Location: {dayLocation}</p>}
            {dayTheme && <p className="text-gray-600 mb-5">Theme: {dayTheme}</p>}

            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">{slot.time}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    <PlaceCard place={slot.data} />
                  </div>
                </div>
              ))
            ) : placesArray.length > 0 ? (
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {placesArray.map((place, placeIndex) => (
                    <PlaceCard key={placeIndex} place={place} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-red-500">No places found for this day.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Place;