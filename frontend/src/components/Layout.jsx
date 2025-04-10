// import React, { useState, useEffect } from 'react';
// import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/option';
// import { ToastContainer, toast } from 'react-toastify';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { useNavigate } from 'react-router-dom';

// const Trip = () => {
//   const [place, setPlace] = useState('');
//   const [day, setDay] = useState('');
//   const [formdata, setFormData] = useState({});
//   const [selectedBudget, setSelectedBudget] = useState(null);
//   const [selectedTraveler, setSelectedTraveler] = useState(null);
//   const [chatSession, setChatSession] = useState(null);
//   const [dialogue, setDialogue] = useState(false);
//   const [Loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const login = useGoogleLogin({
//     onSuccess: tokenResponse => {
//       console.log('Token received:', tokenResponse);
//       getUserProfile(tokenResponse);
//     },
//     onError: error => console.log('Login Error:', error),
//   });

//   const getUserProfile = (tokenInfo) => {
//     if (!tokenInfo?.access_token) {
//       console.error('Access token is missing!');
//       toast.error('Failed to retrieve access token. Please try again.');
//       return;
//     }

//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
//       headers: {
//         Authorization: `Bearer ${tokenInfo?.access_token}`,
//         Accept: 'application/json'
//       }
//     }).then((res) => {

//       const user = {
//         uid: res.data.id,
//         email: res.data.email,
//         name: res.data.name,
//         picture: res.data.picture
//       };
//       localStorage.setItem('user', JSON.stringify(user));
//       setDialogue(false);
//       condition();
//     }).catch((error) => {
//       console.error('Error fetching user profile:', error);
//       toast.error('Failed to fetch user profile. Please try again.');
//     });
//   };

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formdata,
//       [name]: value,
//     });
//   };

//   const handleBudgetClick = (id) => {
//     setSelectedBudget(id);
//     handleInputChange('budget', id);
//   };

//   const handleTravelerClick = (id) => {
//     setSelectedTraveler(id);
//     handleInputChange('traveler', id);
//   };

//   const condition = async () => {
//     if (!formdata.location || !formdata.days || !formdata.traveler || !formdata.budget) {
//       toast.error("Please fill all the fields before submitting.");
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem('user')); 

//     if (!user) {
//       setDialogue(true); 
//     } else {
//       toast('Form is submitted!', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'dark',
//       });

//       setLoading(true);
//       const FINAL_PROMPT = AI_PROMPT
//         .replace('{location}', formdata?.location)
//         .replace('{totaldays}', formdata?.days)
//         .replace('{traveler}', formdata?.traveler)
//         .replace('{budget}', formdata?.budget);


//       if (chatSession) {
//         try {
//           const result = await chatSession.sendMessage(FINAL_PROMPT);
//           const tripData = result.response.text();
//           try {
//             const parsedTripData = JSON.parse(tripData);
//           } catch (error) {
//             console.error("Error parsing AI response:", error);
//             toast.error("Failed to parse AI response. Please try again.");
//             return;
//           }
 
//           await SaveAiTrip(tripData);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error while sending message:', error);
//           setLoading(false);
//         }
//       } else {
//         console.error('Chat session is not defined');
//         setLoading(false);
//       }
//     }
//   };

//   const SaveAiTrip = async (tripData) => {
//     setLoading(true);
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user || !user.email) {
//       console.error('User email is missing or not valid.');
//       toast.error('User email is missing or not valid.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('https://ai-trip-backend.onrender.com/api/trip', {
//         userselection: formdata,
//         tripdata: JSON.parse(tripData),
//         userEmail: user.email,
//       });

//       navigate('/view-trip/' + response.data._id);
//     } catch (error) {
//       console.error("Error saving trip: ", error);
//       toast.error('Failed to save trip. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//     const genAI = new GoogleGenerativeAI(apiKey);

//     const model = genAI.getGenerativeModel({
//       model: 'gemini-2.0-flash',
//       });

//     const generationConfig = {
//       temperature: 1,
//       topP: 0.95,
//       topK: 40,
//       maxOutputTokens: 8192,
//       responseMimeType: 'application/json',
//     };

//     const newChatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });

//     setChatSession(newChatSession);
//   }, []);

//   return (
//     <div className='sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-3'>
//       <h2 className='font-bold text-3xl items-center'>Tell us your travel preferences 🏕️🌴</h2>
//       <p className="text-gray-500 mt-3 text-xl">
//         Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
//       </p>
//       <div className='mt-20'>
//         <div className='myyt-20 flex flex-col gap-10'>
//           <h2 className='text-xl my-3 font-bold'>What is your destination of choice?</h2>
//           <input
//             type='text'
//             placeholder='Write city with state'
//             className='p-2'
//             value={place}
//             onChange={(e) => {
//               setPlace(e.target.value);
//               handleInputChange("location", e.target.value);
//             }}
//           />
//           <h2 className='text-xl my-3 font-bold'>How many days are you planning your trip?</h2>
//           <input
//             type='number'
//             placeholder='Write number of days'
//             className='p-2'
//             value={day}
//             onChange={(e) => {
//               setDay(e.target.value);
//               handleInputChange("days", e.target.value);
//             }}
//           />
//           <div>
//             <h2 className='text-xl my-3 font-bold'>What is Your Budget?</h2>
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
//               {SelectBudgetOptions.map((item) => (
//                 <div
//                   key={item.id}
//                   className={`p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300 ${selectedBudget === item.title ? 'bg-blue-100' : ''
//                     }`}
//                   onClick={() => handleBudgetClick(item.title)}
//                 >
//                   <h3 className='text-xl font-semibold'>{item.icon} {item.title}</h3>
//                   <p className='text-gray-600'>{item.dis}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div>
//             <h2 className='text-xl my-3 font-bold'>Who do you plan on traveling with on your next adventure?</h2>
//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
//               {SelectTravelesList.map((item) => (
//                 <div
//                   key={item.id}
//                   className={`p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300 ${selectedTraveler === item.title ? 'bg-blue-100 shadow-lg border-black' : ''
//                     }`}
//                   onClick={() => handleTravelerClick(item.title)}
//                 >
//                   <h3 className='text-xl font-semibold'>{item.icon} {item.title}</h3>
//                   <p className='text-gray-600'>{item.dis}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='justify-end flex my-10'>
//         <button
//           disabled={Loading}
//           onClick={condition}
//           type="button"
//           className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
//         >
//           {Loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Generate Trip"}
//         </button>
//       </div>
//       {dialogue && (
//         <div
//           tabIndex="-1"
//           aria-hidden={!dialogue}
//           className="overflow-y-auto overflow-x-hidden sm:fixed md:fixed lg:fixed xl:fixed 
//           top-0 left-0 sm:top-50 sm:left-2 sm:right-2
//           md:top-50 md:left-134 md:transform md:-translate-x-1/2
//           lg:top-1/4 lg:left-1/2 lg:w-1/2
//           xl:top-1/4 xl:left-1/2 xl:w-1/2 z-50 justify-center items-center w-full max-h-full"
//         >
//           <div className="relative p-4 w-full max-w-2xl max-h-full">
//             <div className="relative bg-gray-700 rounded-lg shadow-sm dark:bg-gray-700">
//               <div className="flex flex-col items-center justify-between p-4 md:p-5 dark:border-gray-600 border-gray-200">
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-white">
//                   Sign In With Google
//                 </h3>
//                 <p className="mt-5 text-white dark:text-gray-400 ">
//                   Sign in to the App with Google authentication securely
//                 </p>
//                 <button
//                   onClick={login}
//                   className="font-bold text-xl mt-4 dark:bg-black text-white border rounded-md p-3 w-full flex items-center sm:pl-48 md:pl-41 lg:pl-41 xl:pl-47 ">
//                   <FcGoogle className="h-7 w-7" /> Sign In With Google
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Trip;



import React, { useState, useEffect } from 'react';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/option';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiDollarSign, FiUsers } from 'react-icons/fi';

const Trip = () => {
  const [place, setPlace] = useState('');
  const [day, setDay] = useState('');
  const [formdata, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [chatSession, setChatSession] = useState(null);
  const [dialogue, setDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      toast.info('Fetching your profile...');
      getUserProfile(tokenResponse);
    },
    onError: error => {
      console.log('Login Error:', error);
      toast.error('Google login failed. Please try again.');
    },
  });

  const getUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error('Access token is missing!');
      toast.error('Failed to retrieve access token. Please try again.');
      return;
    }

    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((res) => {
      const user = {
        uid: res.data.id,
        email: res.data.email,
        name: res.data.name,
        picture: res.data.picture
      };
      localStorage.setItem('user', JSON.stringify(user));
      setDialogue(false);
      toast.success(`Welcome, ${user.name}!`);
      condition();
    }).catch((error) => {
      console.error('Error fetching user profile:', error);
      toast.error('Failed to fetch user profile. Please try again.');
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleBudgetClick = (id) => {
    setSelectedBudget(id);
    handleInputChange('budget', id);
  };

  const handleTravelerClick = (id) => {
    setSelectedTraveler(id);
    handleInputChange('traveler', id);
  };

  const condition = async () => {
    if (!formdata.location || !formdata.days || !formdata.traveler || !formdata.budget) {
      toast.error("Please fill all the fields before submitting.");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user')); 

    if (!user) {
      setDialogue(true); 
    } else {
      toast.info('Generating your personalized itinerary...');
      generateItinerary();
    }
  };

  const generateItinerary = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formdata?.location)
      .replace('{totaldays}', formdata?.days)
      .replace('{traveler}', formdata?.traveler)
      .replace('{budget}', formdata?.budget);

    if (chatSession) {
      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const tripData = result.response.text();
        try {
          JSON.parse(tripData); // Validate JSON
          await SaveAiTrip(tripData);
        } catch (error) {
          console.error("Error parsing AI response:", error);
          toast.error("Failed to parse AI response. Please try again.");
        }
      } catch (error) {
        console.error('Error while sending message:', error);
        toast.error('Failed to generate itinerary. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Chat session is not defined');
      setLoading(false);
    }
  };

  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.email) {
      console.error('User email is missing or not valid.');
      toast.error('User email is missing or not valid.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://ai-trip-backend.onrender.com/api/trip', {
        userselection: formdata,
        tripdata: JSON.parse(tripData),
        userEmail: user.email,
      });

      navigate('/view-trip/' + response.data._id);
    } catch (error) {
      console.error("Error saving trip: ", error);
      toast.error('Failed to save trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    };

    const newChatSession = model.startChat({
      generationConfig,
      history: [],
    });

    setChatSession(newChatSession);
  }, []);

  return (
    <div className='max-w-6xl max-auto  px-4 sm:px-6 lg:px-8 py-8'>
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
          Plan Your Perfect Trip 🏕️🌴
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Just provide some basic information, and our AI will craft a personalized itinerary for your dream vacation.
        </p>
      </motion.div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        {/* Destination Input */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FiMapPin className="text-blue-600 text-2xl mr-3" />
            <h2 className='text-2xl font-semibold text-gray-800'>Destination</h2>
          </div>
          <motion.div whileHover={{ scale: 1.01 }}>
            <input
              type='text'
              placeholder='Enter city and country (e.g., Paris, France)'
              className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
                handleInputChange("location", e.target.value);
              }}
            />
          </motion.div>
        </div>

        {/* Duration Input */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FiCalendar className="text-blue-600 text-2xl mr-3" />
            <h2 className='text-2xl font-semibold text-gray-800'>Trip Duration</h2>
          </div>
          <motion.div whileHover={{ scale: 1.01 }}>
            <input
              type='number'
              placeholder='Number of days (e.g., 7)'
              className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg'
              value={day}
              min="1"
              onChange={(e) => {
                setDay(e.target.value);
                handleInputChange("days", e.target.value);
              }}
            />
          </motion.div>
        </div>

        {/* Budget Selection */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FiDollarSign className="text-blue-600 text-2xl mr-3" />
            <h2 className='text-2xl font-semibold text-gray-800'>Budget Range</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {SelectBudgetOptions.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedBudget === item.title 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleBudgetClick(item.title)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{item.icon}</div>
                  <div>
                    <h3 className='text-lg font-semibold'>{item.title}</h3>
                    <p className='text-gray-600 text-sm'>{item.dis}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Traveler Type Selection */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FiUsers className="text-blue-600 text-2xl mr-3" />
            <h2 className='text-2xl font-semibold text-gray-800'>Traveling With</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {SelectTravelesList.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedTraveler === item.title 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleTravelerClick(item.title)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{item.icon}</div>
                  <div>
                    <h3 className='text-lg font-semibold'>{item.title}</h3>
                    <p className='text-gray-600 text-sm'>{item.dis}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            onClick={condition}
            className={`px-8 py-4 rounded-xl text-lg font-semibold flex items-center ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                Generating Your Itinerary...
              </>
            ) : (
              'Generate My Perfect Trip'
            )}
          </motion.button>
        </div>
      </div>

      {/* Google Sign-in Modal */}
      {dialogue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full"
          >
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Sign In Required
              </h3>
              <p className="text-gray-600 mb-6">
                Please sign in with Google to save and access your trip itineraries.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={login}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </motion.button>
              
              <button
                onClick={() => setDialogue(false)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Trip;
