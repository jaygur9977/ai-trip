import React, { useState, useEffect } from 'react';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/option';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../services/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Trip = () => {
  const [place, setPlace] = useState('');
  const [day, setDay] = useState('');
  const [formdata, setFormData] = useState({});
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [chatSession, setChatSession] = useState(null); // Add state for chatSession
  const [dialogue, setDialogue] = useState(false);
  const [Loading, setLoading] = useState(false)


  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('Token received:', tokenResponse);
      // Call getUserProfile with the access token
      getUserProfile(tokenResponse);

    },
    onError: error => console.log('Login Error:', error),


  });
  const getUserProfile = (tokenInfo) => {

    if (!tokenInfo?.access_token) {
      console.error('Access token is missing!');
      return;
    }

    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      Headers: {
        Authorization: `Bearer ${tokenInfo?.access_token} `,
        Accept: 'application/json'
      }
    }).then((res) => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res))
      setDialogue(false)
      condition();

    })
  }

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

    const user = localStorage.getItem('user');

    if (!user) {
      setDialogue(true);
    } else {



      toast('Form is submitted!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formdata?.location)
        .replace('{totaldays}', formdata?.days)
        .replace('{traveler}', formdata?.traveler)
        .replace('{budget}', formdata?.budget);
      if (chatSession) {
        try {
          const result = await chatSession.sendMessage(FINAL_PROMPT);
          console.log(result.response.text());
          setLoading(false)
          SaveAiTrip(result.response.text())
        } catch (error) {
          console.error('Error while sending message:', error);
        }
      }
    }
  };

  const SaveAiTrip = async (tripData) => {
    setLoading(true);
  
    try {
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!user || !user.email) {
        console.error('User email is missing or not valid.');
        toast.error('User email is missing or not valid.');
        setLoading(false);
        return;
      }
  
      const tripPayload = {
        formdata: formdata, // Save the form data
        tripData: tripData, // Save the trip data from the AI
        userEmail: user?.email, // Save the user's email
      };
  
      // Send data to the backend API
      const response = await axios.post('http://localhost:5000/save-trip', tripPayload);
  
      if (response.status === 200) {
        toast.success('Trip data saved successfully!');
      }
  
    } catch (error) {
      console.error('Error saving trip data to the backend:', error);
      toast.error('Error saving trip data.');
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: 'Generate a travel plan for location, with a given budget, traveler info, and days',
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
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-3'>
      <h2 className='font-bold text-3xl items-center'>Tell us your travel preferences 🏕️🌴</h2>
      <p className="text-gray-500 mt-3 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-20'>
        <div className='mt-20 flex flex-col gap-10'>
          <h2 className='text-xl my-3 font-bold'>What is your destination of choice?</h2>
          <input
            type='text'
            placeholder='Write city'
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
              handleInputChange("location", e.target.value);
            }}
          />
          <h2 className='text-xl my-3 font-bold'>How many days are you planning your trip?</h2>
          <input
            type='number'
            placeholder='Write number of days'
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
              handleInputChange("days", e.target.value);
            }}
          />
          <div>
            <h2 className='text-xl my-3 font-bold'>What is Your Budget?</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
              {SelectBudgetOptions.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300 ${selectedBudget === item.title ? 'bg-blue-100' : ''
                    }`}
                  onClick={() => handleBudgetClick(item.title)}
                >
                  <h3 className='text-xl font-semibold'>{item.icon} {item.title}</h3>
                  <p className='text-gray-600'>{item.dis}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className='text-xl my-3 font-bold'>Who do you plan on traveling with on your next adventure?</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
              {SelectTravelesList.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300 ${selectedTraveler === item.title ? 'bg-blue-100 shadow-lg border-black' : ''
                    }`}
                  onClick={() => handleTravelerClick(item.title)}
                >
                  <h3 className='text-xl font-semibold'>{item.icon} {item.title}</h3>
                  <p className='text-gray-600'>{item.dis}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='justify-end flex my-10'>
        <button
        disabled={Loading}
         onClick={condition}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
           {Loading ?
          <AiOutlineLoading3Quarters />:"generate trip"
         } </button>
      </div>
      {dialogue && (
        <div
          tabIndex="-1"
          aria-hidden={!dialogue}
          className="overflow-y-auto overflow-x-hidden sm:fixed md:fixed lg:fixed xl:fixed 
          top-0 left-0 sm:top-50 sm:left-2 sm:right-2
          md:top-50 md:left-134 md:transform md:-translate-x-1/2
          lg:top-1/4 lg:left-1/2 lg:w-1/2
          xl:top-1/4 xl:left-1/2 xl:w-1/2 z-50 justify-center items-center w-full max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-gray-700 rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex flex-col items-center justify-between p-4 md:p-5 dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-white">
                  Sign In With Google
                </h3>
                <p className="mt-5 text-white dark:text-gray-400 ">
                  Sign in to the App with Google authentication securely
                </p>
                <button
                  onClick={login}
                  className="font-bold text-xl mt-4 dark:bg-black text-white border rounded-md p-3 w-full flex items-center sm:pl-48 md:pl-41 lg:pl-41 xl:pl-47 ">
                  <FcGoogle className="h-7 w-7" /> Sign In With Google
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default Trip;
