


// import React from 'react';

// const PlaceCard = ({ place }) => {
//   // Determine which property names to use based on data structure
//   const placeName = place.place_name || place.name || "Unnamed Place";
//   const placeDetails = place.place_details || place.details || "No details available";
//   const ticketPricing = place.ticket_pricing || place.price || "Free";
//   const imageUrl = place.place_image_url || place.image_url;
//   const timeTravel = place.time_travel || place.travel_time;

//   return (
//     <div className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
//       {/* Place Image */}
//       {imageUrl && (
//         <div className="h-48 overflow-hidden">
//           <img 
//             src={imageUrl} 
//             alt={placeName}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//             }}
//           />
//         </div>
//       )}

//       {/* Place Details */}
//       <div className="p-4 bg-white">
//         <h3 className="text-xl font-bold">{placeName}</h3>
//         <p className="mt-2 text-gray-600">
//           💰 Ticket Price: {ticketPricing}
//         </p>
//         {place.rating && (
//           <p className="mt-2 text-gray-600">
//             <span className="font-bold">⭐</span> {place.rating}
//           </p>
//         )}
//         <p className="mt-2 text-gray-600 text-sm">
//           {placeDetails}
//         </p>
//         {timeTravel && (
//           <p className="mt-2 text-gray-600 text-sm">
//             🚗 Travel Time: {timeTravel}
//           </p>
//         )}
//       </div>

//       {/* Hover Overlay */}
//       <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//         <p className="text-white text-lg font-semibold">View Details</p>
//       </div>
//     </div>
//   );
// };

// const Place = ({ trip }) => {
//   // Access tripdata array from the trip object
//   const tripData = trip?.tripdata;

//   // Validate main data structure
//   if (!tripData || !Array.isArray(tripData)) {
//     return (
//       <div className="mt-12 p-4 bg-red-50 rounded-lg">
//         <p className="text-red-600">No valid trip data available. Please check the data structure.</p>
//       </div>
//     );
//   }

//   // Get trip overview information
//   const tripInfo = trip?.userselection || {};
//   const { location, days, budget, traveler } = tripInfo;

//   return (
//     <div className="mt-12">

//       <h3 className="text-lg font-bold mb-4">Places to Visit</h3>

//       {/* Day-wise Plan */}
//       {tripData.map((dayPlan) => {
//         // Validate day plan structure
//         if (!dayPlan || typeof dayPlan !== 'object') {
//           console.warn("Invalid day plan structure:", dayPlan);
//           return null;
//         }

//         // Determine which array to use (itinerary takes precedence)
//         const placesArray = dayPlan.itinerary || dayPlan.plan || dayPlan.activities || [];
//         const dayNumber = dayPlan.day || 'Unknown Day';
//         const bestTime = dayPlan.best_time_to_visit || dayPlan.best_time|| dayPlan.bestTimeToVisit || "No time specified";

//         // Validate places array
//         if (!Array.isArray(placesArray) || placesArray.length === 0) {
//           console.warn(`No valid places found for day ${dayNumber}`);
//           return (
//             <div key={dayNumber} className="mb-8">
//               <h1 className="text-xl font-bold mb-2 mt-8">Day {dayNumber}</h1>
//               <p className="text-red-500">No places found for this day.</p>
//             </div>
//           );
//         }

//         return (
//           <div key={dayNumber} className="mb-8">
//             {/* Day Heading */}
//             <h1 className="text-xl font-bold mb-2 mt-8">Day {dayNumber}</h1>
//             <p className="text-red-600 mb-5">
//               Best Time to Visit: <span className='text-blue-400 font-bold'>{bestTime}</span>
//             </p>

//             {/* Places Section */}
//             <div className="mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                 {placesArray.map((place, placeIndex) => (
//                   <PlaceCard key={placeIndex} place={place} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Place;



import React from 'react';

const PlaceCard = ({ place }) => {
  // Determine which property names to use based on data structure
  const placeName = place.placeName || place.place_name || place.name || "Unnamed Place";
  const placeDetails = place.placeDetails || place.place_details || place.details || "No details available";
  const ticketPricing = place.ticketPricing || place.ticket_pricing || place.price || "Free";
  const imageUrl = place.placeImageUrl || place.place_image_url || place.image_url;
  const timeTravel = place.travelTime || place.time_travel || place.travel_time;
  const rating = place.rating;
  const bestTimeToVisit = place.bestTimeToVisit || place.best_time_to_visit;

  const openPlaceInMaps = () => {
    const query = encodeURIComponent(placeName);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={openPlaceInMaps}
    >
      {/* Place Image - Displayed prominently */}
      {imageUrl ? (
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={placeName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Place+Image';
              e.target.className = 'w-full h-full object-contain bg-gray-100 p-4';
            }}
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      
      {/* Place Details */}
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
  // Access tripdata array from the trip object
  const tripData = trip?.tripdata;

  // Validate main data structure
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

      {/* Day-wise Plan */}
      {tripData.map((dayPlan) => {
        // Validate day plan structure
        if (!dayPlan || typeof dayPlan !== 'object') {
          console.warn("Invalid day plan structure:", dayPlan);
          return null;
        }

        const dayNumber = dayPlan.day || 'Unknown Day';
        const dayLocation = dayPlan.location;
        const dayTheme = dayPlan.theme;

        // Check for both data structures
        let timeSlots = [];
        let placesArray = [];
        
        // Structure 1: Has morning/afternoon/evening objects
        if (dayPlan.morning || dayPlan.afternoon || dayPlan.evening) {
          timeSlots = [
            { time: 'Morning', data: dayPlan.morning },
            { time: 'Afternoon', data: dayPlan.afternoon },
            { time: 'Evening', data: dayPlan.evening }
          ].filter(slot => slot.data);
        } 
        // Structure 2: Has itinerary array
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
            {/* Day Heading */}
            <h1 className="text-xl font-bold mb-2 mt-8">Day {dayNumber}</h1>
            {dayLocation && <p className="text-blue-600 mb-1">Location: {dayLocation}</p>}
            {dayTheme && <p className="text-gray-600 mb-5">Theme: {dayTheme}</p>}

            {/* Render based on data structure */}
            {timeSlots.length > 0 ? (
              // Render morning/afternoon/evening structure
              timeSlots.map((slot, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">{slot.time}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    <PlaceCard place={slot.data} />
                  </div>
                </div>
              ))
            ) : placesArray.length > 0 ? (
              // Render itinerary array structure
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {placesArray.map((place, placeIndex) => (
                    <PlaceCard key={placeIndex} place={place} />
                  ))}
                </div>
              </div>
            ) : (
              // No places found for this day
              <p className="text-red-500">No places found for this day.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Place;