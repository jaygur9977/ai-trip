import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='flex flex-col items-center gap-9 mx-50'>
      <h1 className='mt-16 items-center  font-extrabold text-[60px]'><span className="text-red-300">Discover Your Next Adventure with AI:</span> 
      <br />Personalized Itineraries at Your Fingertips</h1>

      <p className="text-2xl text-gray-500 text-center">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>


      <Link to={'/trip'}>
      
      <button type="button" class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Getting Started</button>
      </Link>
    </div>
  )
}

export default Home