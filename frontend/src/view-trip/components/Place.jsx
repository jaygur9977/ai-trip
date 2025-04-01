// import React from 'react';

// const Place = ({ trip }) => {
//   const itinerary = trip?.tripdata?.[0]?.travelPlan?.itinerary; // Access itinerary from tripdata[0]

//   // Validate data before rendering
//   if (!itinerary || typeof itinerary !== 'object') {
//     return <p className="text-gray-600">Invalid itinerary data. Please check the data structure.</p>;
//   }

//   return (
//     <div className="mt-12">
//       {/* Trip Overview */}
//       <h3 className="text-lg font-bold mb-4">Places to Visit</h3>

//       {/* Day-wise Plan */}
//       {Object.keys(itinerary).map((dayKey) => {
//         const dayPlan = itinerary[dayKey];

//         // Validate dayPlan structure
//         if (!dayPlan || typeof dayPlan !== 'object' || !Array.isArray(dayPlan.places)) {
//           console.warn("Invalid day plan:", dayPlan);
//           return null; // Skip rendering invalid day plans
//         }

//         return (
//           <div key={dayKey} className="mb-8">
//             {/* Day Heading */}
//             <h1 className="text-xl font-bold mb-2 mt-8">{dayKey}</h1>
//             <h2 className="text-lg font-semibold mb-3 text-orange-300">
//               Theme: {dayPlan.theme || "No theme specified"}
//             </h2>
//             <p className="text-red-600 mb-5">Best Time to Visit: <span className='text-blue-400 font-bold'>{dayPlan.bestTimeToVisit || "No time specified."}</span></p>

//             {/* Places Section */}
//             <div className="mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                 {dayPlan.places.map((place, placeIndex) => (
//                   <div
//                     key={placeIndex}
//                     className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
//                   >
//                     {/* Place Details */}
//                     <div className="p-4 bg-white">
//                       <h3 className="text-xl font-bold">{place.placeName || "Unnamed Place"}</h3>
//                       <p className="mt-2 text-gray-600">
//                         💰 Ticket Price: ${place.ticketPricing || "Free"}
//                       </p>
//                       <p className="mt-2 text-gray-600">
//                         <span className="font-bold">⭐</span> {place.rating}
//                       </p>
//                       <p className="mt-2 text-gray-600 text-sm">
//                         {place.placeDetails}
//                       </p>
//                       <p className="mt-2 text-gray-600 text-sm">
//                         🚗 Travel Time: {place.timeTravel}
//                       </p>
//                     </div>

//                     {/* Hover Overlay */}
//                     <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                       <p className="text-white text-lg font-semibold">View Details</p>
//                     </div>
//                   </div>
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



// import React from 'react';

// const Place = ({ trip }) => {
//   // Access itinerary from tripdata[0].travelPlan.itinerary
//   const itinerary = trip?.tripdata?.[0]?.travelPlan?.itinerary;

//   // Validate data before rendering
//   if (!itinerary || !Array.isArray(itinerary)) {
//     return <p className="text-gray-600">Invalid itinerary data. Please check the data structure.</p>;
//   }

//   return (
//     <div className="mt-12">
//       {/* Trip Overview */}
//       <h3 className="text-lg font-bold mb-4">Places to Visit</h3>

//       {/* Day-wise Plan */}
//       {itinerary.map((dayPlan, dayIndex) => {
//         // Validate dayPlan structure
//         if (!dayPlan || typeof dayPlan !== 'object' || !Array.isArray(dayPlan.plan)) {
//           console.warn("Invalid day plan:", dayPlan);
//           return null; // Skip rendering invalid day plans
//         }

//         return (
//           <div key={dayIndex} className="mb-8">
//             {/* Day Heading */}
//             <h1 className="text-xl font-bold mb-2 mt-8">Day {dayPlan.day}</h1>
//             <h2 className="text-lg font-semibold mb-3 text-orange-300">
//               Best Time to Visit: <span className='text-blue-400 font-bold'>{dayPlan.bestTimeToVisit || "No time specified."}</span>
//             </h2>

//             {/* Places Section */}
//             <div className="mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                 {dayPlan.plan.map((place, placeIndex) => (
//                   <div
//                     key={placeIndex}
//                     className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
//                   >
//                     {/* Place Details */}
//                     <div className="p-4 bg-white">
//                       <h3 className="text-xl font-bold">{place.placeName || "Unnamed Place"}</h3>
//                       <p className="mt-2 text-gray-600">
//                         💰 Ticket Price: {place.ticketPricing || "Free"}
//                       </p>
//                       <p className="mt-2 text-gray-600">
//                         <span className="font-bold">⭐</span> {place.rating}
//                       </p>
//                       <p className="mt-2 text-gray-600 text-sm">
//                         {place.placeDetails}
//                       </p>
//                       <p className="mt-2 text-gray-600 text-sm">
//                         🚗 Travel Time: {place.travelTime}
//                       </p>
//                     </div>

//                     {/* Hover Overlay */}
//                     <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                       <p className="text-white text-lg font-semibold">View Details</p>
//                     </div>
//                   </div>
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


// import React from 'react';

// const Place = ({ trip }) => {
//   // Access itinerary from tripdata[0].travelPlan.itinerary
//   const itinerary = trip?.tripdata?.[0]?.travelPlan?.itinerary;

//   // Validate data before rendering
//   if (!itinerary || typeof itinerary !== 'object') {
//     return <p className="text-gray-600">Invalid itinerary data. Please check the data structure.</p>;
//   }

//   return (
//     <div className="mt-12">
//       {/* Trip Overview */}
//       <h3 className="text-lg font-bold mb-4">Places to Visit</h3>

//       {/* Day-wise Plan */}
//       {Object.keys(itinerary).map((dayKey) => {
//         const dayPlan = itinerary[dayKey];

//         // Validate dayPlan structure
//         if (!dayPlan || typeof dayPlan !== 'object' || !Array.isArray(dayPlan.plan)) {
//           console.warn("Invalid day plan:", dayPlan);
//           return null; // Skip rendering invalid day plans
//         }

//         return (
//           <div key={dayKey} className="mb-8">
//             {/* Day Heading */}
//             <h1 className="text-xl font-bold mb-2 mt-8">{dayKey}</h1>
//             <h2 className="text-lg font-semibold mb-3 text-orange-300">
//               Theme: {dayPlan.theme || "No theme specified"}
//             </h2>
//             <p className="text-red-600 mb-5">
//               Best Time to Visit: <span className='text-blue-400 font-bold'>{dayPlan.bestTimeToVisit || "No time specified."}</span>
//             </p>

//             {/* Places Section */}
//             <div className="mt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                 {dayPlan.plan.map((place, placeIndex) => (
//                   <div
//                     key={placeIndex}
//                     className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
//                   >
//                     {/* Place Details */}
//                     <div className="p-4 bg-white">
//                       <h3 className="text-xl font-bold">{place.placeName || "Unnamed Place"}</h3>
//                       <p className="mt-2 text-gray-600">
//                         💰 Ticket Price: {place.ticketPricing || "Free"}
//                       </p>
//                       <p className="mt-2 text-gray-600">
//                         <span className="font-bold">⭐</span> {place.rating}
//                       </p>
//                       <p className="mt-2 text-gray-600 text-sm">
//                         {place.placeDetails}
//                       </p>
//                       <p className="mt-2 text-gray-600 text-sm">
//                         🚗 Travel Time: {place.travelTime}
//                       </p>
//                     </div>

//                     {/* Hover Overlay */}
//                     <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                       <p className="text-white text-lg font-semibold">View Details</p>
//                     </div>
//                   </div>
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

const Place = ({ trip }) => {
  // Access itinerary from tripdata[0].travelPlan.itinerary
  const itinerary = trip?.tripdata?.[0]?.travelPlan?.itinerary;

  // Validate data before rendering
  if (!itinerary || (typeof itinerary !== 'object' && !Array.isArray(itinerary))) {
    return <p className="text-gray-600">Invalid itinerary data. Please check the data structure.</p>;
  }

  // Function to render day-wise plans
  const renderDayPlans = (dayKey, dayPlan) => {
    // Validate dayPlan structure
    if (!dayPlan || typeof dayPlan !== 'object' || !Array.isArray(dayPlan.plan || dayPlan.places)) {
      console.warn("Invalid day plan:", dayPlan);
      return null; // Skip rendering invalid day plans
    }

    const places = dayPlan.plan || dayPlan.places || dayPlan.activities; // Handle both "plan" and "places" keys

    return (
      <div key={dayKey} className="mb-8">
        {/* Day Heading */}
        <h1 className="text-xl font-bold mb-2 mt-8">{dayKey}</h1>
        <h2 className="text-lg font-semibold mb-3 text-orange-300">
          Theme: {dayPlan.theme || "No theme specified"}
        </h2>
        <p className="text-red-600 mb-5">
          Best Time to Visit: <span className='text-blue-400 font-bold'>{dayPlan.bestTimeToVisit || "No time specified."}</span>
        </p>

        {/* Places Section */}
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {places.map((place, placeIndex) => (
              <div
                key={placeIndex}
                className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                {/* Place Details */}
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-bold">{place.placeName || "Unnamed Place"}</h3>
                  <p className="mt-2 text-gray-600">
                    💰 Ticket Price: {place.ticketPricing || "Free"}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-bold">⭐</span> {place.rating}
                  </p>
                  <p className="mt-2 text-gray-600 text-sm">
                    {place.placeDetails}
                  </p>
                  <p className="mt-2 text-gray-600 text-sm">
                    🚗 Travel Time: {place.travelTime || place.timeTravel}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">View Details</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12">
      {/* Trip Overview */}
      <h3 className="text-lg font-bold mb-4">Places to Visit</h3>

      {/* Day-wise Plan */}
      {Array.isArray(itinerary) ? (
        // Handle array-based itinerary
        itinerary.map((dayPlan, dayIndex) => renderDayPlans(`Day ${dayPlan.day || dayIndex + 1}`, dayPlan))
      ) : (
        // Handle object-based itinerary
        Object.keys(itinerary).map((dayKey) => renderDayPlans(dayKey, itinerary[dayKey]))
      )}
    </div>
  );
};

export default Place;