import React from 'react';
import PropTypes from 'prop-types';

const Hotel = ({ trip }) => {
  const hotels = trip?.tripdata?.[0]?.travelPlan?.hotelOptions
  ? trip.tripdata[0].travelPlan.hotelOptions
  : trip?.tripdata?.[0]?.travelPlan?.hotels;


  if (!hotels || !Array.isArray(hotels)) {
    return <p>No hotels found.</p>;
  }

  // Function to open Google Maps in normal view using the hotel name
  const openGoogleMaps = (hotelName) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}`;
    window.open(url, '_blank');
  };

  const onbtnclick = () => {
    const url = `https://www.google.com/maps/@?api=1&map_action=map&basemap=satellite`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mt-6">Hotel Recommendations</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="relative border rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => openGoogleMaps(hotel.hotelName)}
            role="button"
            tabIndex={0}
            aria-label={`View ${hotel.hotelName} on Google Maps`}
          >
            {/* Hotel Details */}
            <div className="p-4 bg-white">
              <h3 className="text-xl font-semibold">{hotel.hotelName}</h3>
              <p className="text-gray-500 font-bold mt-2 text-sm">
                📍 {hotel.hotelAddress}
              </p>
              <p className="text-gray-600 font-bold mt-2">
                💰 ${hotel.price} per night
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">⭐</span> {hotel.rating}
              </p>
              <p className="text-gray-600 mt-2 text-sm">
                {hotel.description}
              </p>
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-blue-300 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">View on Map</p>
            </div>
          </div>
        ))}
        <button
          onClick={onbtnclick}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4"
          aria-label="Open Google Maps in satellite view"
        >
          Open Google Maps
        </button>
      </div>
    </div>
  );
};

Hotel.propTypes = {
  trip: PropTypes.shape({
    tripdata: PropTypes.arrayOf(
      PropTypes.shape({
        hotels: PropTypes.arrayOf(
          PropTypes.shape({
            hotelName: PropTypes.string.isRequired,
            hotelAddress: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
          })
        ),
      })
    ),
  }),
};

export default Hotel;