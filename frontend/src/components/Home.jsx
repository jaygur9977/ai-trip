// import React from 'react'
// import { Link } from 'react-router-dom'


// const Home = () => {
//   return (
//     <div className='flex flex-col items-center gap-9 mx-50'>
//       <h1 className='mt-16 items-center  font-extrabold text-[60px]'><span className="text-red-300">Discover Your Next Adventure with AI:</span> 
//       <br />Personalized Itineraries at Your Fingertips</h1>

//       <p className="text-2xl text-gray-500 text-center">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>


//       <Link to={'/trip'}>
      
//       <button type="button" class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Getting Started</button>
//       </Link>
//     </div>
//   )
// }

// export default Home


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCompass, FiMap, FiCalendar, FiDollarSign, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FiCompass className="w-8 h-8" />,
      title: "AI-Powered Recommendations",
      description: "Get personalized suggestions based on your preferences"
    },
    {
      icon: <FiMap className="w-8 h-8" />,
      title: "Optimized Routes",
      description: "Smart itinerary planning to maximize your time"
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Flexible Scheduling",
      description: "Easily adjust plans to fit your travel style"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Budget Tracking",
      description: "Stay on top of your travel expenses"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImage ? 1 : 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            <span className="block">Discover Your Next</span>
            <span className="block text-blue-200">Adventure with AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Your personal trip planner creating custom itineraries tailored to your interests and budget.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <Link to="/trip">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 flex items-center mx-auto"
              >
                Plan Your Trip Now
                <FiArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our AI Trip Planner?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We combine artificial intelligence with travel expertise to create your perfect journey.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="pt-6"
                >
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                        {feature.icon}
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 text-center">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by Travelers Worldwide
            </h2>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote: "The AI planner saved me hours of research and created an itinerary that perfectly matched my interests.",
                author: "Sarah J., Digital Nomad"
              },
              {
                quote: "I never would have discovered these hidden gems without the personalized recommendations.",
                author: "Michael T., Adventure Seeker"
              },
              {
                quote: "As a solo traveler, I felt safe and prepared with the detailed plans and local tips provided.",
                author: "Priya K., Solo Explorer"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-medium text-blue-600">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to Transform Your Travel Experience?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Start planning your dream trip in minutes with our AI-powered platform.
          </p>
          <div className="mt-8">
            <Link to="/trip">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 inline-flex items-center"
              >
                Get Started For Free
                <FiArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
