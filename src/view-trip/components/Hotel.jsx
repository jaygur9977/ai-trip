// import React from 'react';
// import PropTypes from 'prop-types';

// const Hotel = ({ trip }) => {
//   const hotels = trip?.tripdata?.[0]?.travelPlan?.hotelOptions
//   ? trip.tripdata[0].travelPlan.hotelOptions
//   : trip?.tripdata?.[0]?.travelPlan?.hotels;


//   if (!hotels || !Array.isArray(hotels)) {
//     return <p>No hotels found.</p>;
//   }

//   // Function to open Google Maps in normal view using the hotel name
//   const openGoogleMaps = (hotelName) => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}`;
//     window.open(url, '_blank');
//   };

//   const onbtnclick = () => {
//     const url = `https://www.google.com/maps/@?api=1&map_action=map&basemap=satellite`;
//     window.open(url, '_blank');
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mt-6">Hotel Recommendations</h2>
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {hotels.map((hotel, index) => (
//           <div
//             key={index}
//             className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
//             onClick={() => openGoogleMaps(hotel.hotelName)}
//             role="button"
//             tabIndex={0}
//             aria-label={`View ${hotel.hotelName} on Google Maps`}
//           >
//             {/* Hotel Details */}
//             <div className="p-4 bg-white">
//               <h3 className="text-xl font-semibold">{hotel.hotelName}</h3>
//               <p className="text-gray-500 font-bold mt-2 text-sm">
//                 📍 {hotel.hotelAddress}
//               </p>
//               <p className="text-gray-600 font-bold mt-2">
//                 💰 ${hotel.price} per night
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-bold">⭐</span> {hotel.rating}
//               </p>
//               <p className="text-gray-600 mt-2 text-sm">
//                 {hotel.description}
//               </p>
//             </div>
//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//               <p className="text-white text-lg font-semibold">View on Map</p>
//             </div>
//           </div>
//         ))}
//         <button
//           onClick={onbtnclick}
//           type="button"
//           className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4"
//           aria-label="Open Google Maps in satellite view"
//         >
//           Open Google Maps
//         </button>
//       </div>
//     </div>
//   );
// };

// Hotel.propTypes = {
//   trip: PropTypes.shape({
//     tripdata: PropTypes.arrayOf(
//       PropTypes.shape({
//         hotels: PropTypes.arrayOf(
//           PropTypes.shape({
//             hotelName: PropTypes.string.isRequired,
//             hotelAddress: PropTypes.string.isRequired,
//             price: PropTypes.number.isRequired,
//             rating: PropTypes.number.isRequired,
//             description: PropTypes.string.isRequired,
//           })
//         ),
//       })
//     ),
//   }),
// };

// export default Hotel;




import React from 'react';
import PropTypes from 'prop-types';

const Hotel = ({ trip }) => {
  // Access hotel options from either hotel_options or hotels array
  const hotels = trip?.tripdata?.[0]?.hotel_options || trip?.tripdata?.[0]?.hotels;

  if (!hotels || !Array.isArray(hotels)) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">No hotel recommendations found for this trip.</p>
      </div>
    );
  }

  // Function to open Google Maps with hotel location
  const openGoogleMaps = (hotelName, hotelAddress) => {
    const query = `${encodeURIComponent(hotelName)}, ${encodeURIComponent(hotelAddress)}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  const openGoogleMapsSatellite = () => {
    const url = `https://www.google.com/maps/@?api=1&map_action=map&basemap=satellite`;
    window.open(url, '_blank');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Hotel Recommendations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Hotel Image */}
            {hotel.hotel_image_url && (
              <div className="h-48 overflow-hidden">
                <img
                  src={hotel.hotel_image_url}
                  alt={hotel.hotel_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Hotel+Image';
                  }}
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{hotel.hotel_name}</h3>
              
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 font-bold">⭐ {hotel.rating}</span>
                <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                  {hotel.price}
                </span>
              </div>

              <p className="text-gray-600 mb-3">
                <span className="text-gray-500">📍</span> {hotel.hotel_address}
              </p>

              <p className="text-gray-700 mb-4">{hotel.description}</p>

              <button
                onClick={() => openGoogleMaps(hotel.hotel_name, hotel.hotel_address)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors duration-300"
              >
                View on Map
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={openGoogleMapsSatellite}
          className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
          </svg>
          Open Satellite View
        </button>
      </div>
    </div>
  );
};

Hotel.propTypes = {
  trip: PropTypes.shape({
    tripdata: PropTypes.arrayOf(
      PropTypes.shape({
        hotel_options: PropTypes.arrayOf(
          PropTypes.shape({
            hotel_name: PropTypes.string.isRequired,
            hotel_address: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            hotel_image_url: PropTypes.string,
          })
        ),
        hotels: PropTypes.arrayOf(
          PropTypes.shape({
            hotelName: PropTypes.string,
            hotelAddress: PropTypes.string,
            price: PropTypes.string,
            rating: PropTypes.number,
            description: PropTypes.string,
            imageUrl: PropTypes.string,
          })
        ),
      })
    ),
  }),
};

export default Hotel;