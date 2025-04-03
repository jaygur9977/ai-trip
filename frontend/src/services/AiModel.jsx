import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_PROMPT } from '../constants/option';

export const conditionHandler = async (formdata) => {
  const user = localStorage.getItem('user');

  if (!user) {
    alert('Please log in to continue'); 
    return;
  }

  const toastMessage = 'Form is submitted!';
  toast(toastMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formdata?.location)
    .replace('{totaldays}', formdata?.days)
    .replace('{traveler}', formdata?.traveler)
    .replace('{budget}', formdata?.budget);

  if (window.chatSession) {
    try {
      const result = await window.chatSession.sendMessage(FINAL_PROMPT);
    } catch (error) {
      console.error('Error while sending message:', error);
    }
  }
};

export const initializeChatSession = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    
    systemInstruction: "Generate day wise trip plan for {location} for {totaldays} days for {traveler} with a  {budget} budget, suggest itinerary with placeName, Place Details, Place Image Url, ticket Pricing, rating, Time travel each of the location for total days with each day plan with best time to visit and give as  in JSON format",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const newChatSession = model.startChat({
    generationConfig,
    history: [],
  });

  window.chatSession = newChatSession;
};
