// import React, { useEffect, useState } from 'react';

// const Infosection = ({ trip }) => {
//   const [photoUrl, setPhotoUrl] = useState(null);

//   useEffect(() => {
//     if (trip?.userselection?.location) {
//       fetchWikipediaImage(trip.userselection.location);
//     }
//   }, [trip]);

//   const fetchWikipediaImage = async (query) => {
//     try {
//       const response = await fetch(
//         `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${query}&pithumbsize=500&origin=*`
//       );
//       const data = await response.json();
//       const page = Object.values(data.query.pages)[0];
//       if (page.thumbnail) {
//         setPhotoUrl(page.thumbnail.source);
//       }
//     } catch (error) {
//       console.error("Error fetching Wikipedia image:", error);
//     }
//   };

//   return (
//     <div>
//       <img
//         src={photoUrl || "/default-place.jpg"}
//         alt={trip?.userselection?.location}
//         className="rounded-lg w-full h-65 object-cover"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = "https://static.vecteezy.com/system/resources/previews/008/009/837/non_2x/outdoor-tourism-landscape-luxurious-beach-resort-with-swimming-pool-and-beach-chairs-or-loungers-umbrellas-with-palm-trees-and-blue-sky-sea-horizon-summer-island-relax-travel-and-idyllic-vacation-photo.jpg";
//         }}
//       />


//       <div className="my-5 flex flex-col gap-2">
//         <h1 className="text-xl font-bold uppercase">
//           {trip?.userselection?.location}
//         </h1>
//       </div>

//       <div className="flex gap-5">
//         <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full">
//           📅 {trip?.userselection?.days} day
//         </h2>
//         <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full">
//           💰 {trip?.userselection?.budget} budget
//         </h2>
//         <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full">
//           🥂 travel with {trip?.userselection?.traveler}
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default Infosection;




import React, { useEffect, useState } from 'react';

const Infosection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (trip?.userselection?.location) {
      fetchWikipediaImage(trip.userselection.location);
    }
  }, [trip]);

  const fetchWikipediaImage = async (query) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${query}&pithumbsize=500&origin=*`
      );
      const data = await response.json();
      const page = Object.values(data.query.pages)[0];
      if (page.thumbnail) {
        setPhotoUrl(page.thumbnail.source);
      }
    } catch (error) {
      console.error("Error fetching Wikipedia image:", error);
    }
  };

  return (
    <div>
      <img
        src={photoUrl || "/default-place.jpg"}
        alt={trip?.userselection?.location}
        className="rounded-lg w-full h-65 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://static.vecteezy.com/system/resources/previews/008/009/837/non_2x/outdoor-tourism-landscape-luxurious-beach-resort-with-swimming-pool-and-beach-chairs-or-loungers-umbrellas-with-palm-trees-and-blue-sky-sea-horizon-summer-island-relax-travel-and-idyllic-vacation-photo.jpg";
        }}
      />


      <div className="my-5 flex flex-col gap-2">
        <h1 className="text-xl font-bold uppercase">
          {trip?.userselection?.location}
        </h1>
      </div>

      <div className="flex gap-5">
        <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full">
          📅 {trip?.userselection?.days} day
        </h2>
        <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full">
          💰 {trip?.userselection?.budget} budget
        </h2>
        <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full">
          🥂 travel with {trip?.userselection?.traveler}
        </h2>
      </div>
    </div>
  );
};

export default Infosection;
