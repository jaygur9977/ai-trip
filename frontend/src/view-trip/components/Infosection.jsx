


import React from 'react';

const Infosection = ({ trip }) => {

  return (
    <div>
    <img className='w-full h-[250px] object-cover rounded-xl' src='https://aitrip.tubeguruji.com/placeholder.jpg' alt="data:image/jpeg;base64,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" />

    <div className="my-5 flex flex-col gap-2">
        <h1 className="text-xl font-bold uppercase">{trip?.tripdata?.[0]?.travelPlan?.location}</h1>
      </div>


      <div className="flex gap-5 ">
        <h2 className="p-1 px-3  bg-gray-200 text-gray-500 rounded-full  ">📅 {trip?.userselection?.days} day</h2>
        <h2 className="p-1 px-3  bg-gray-200 text-gray-500 rounded-full ">💰 {trip?.userselection?.budget} budget</h2>
        <h2 className="p-1 px-3  bg-gray-200 text-gray-500 rounded-full ">🥂 travel with {trip?.userselection?.traveler}</h2>
       </div>
</div>
  );
};

export default Infosection;