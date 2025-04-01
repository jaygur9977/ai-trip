// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDReBUTvA4Lps_hSMsTkvapovey5_wn21Y",
  authDomain: "ai-trip-29103.firebaseapp.com",
  projectId: "ai-trip-29103",
  storageBucket: "ai-trip-29103.firebasestorage.app",
  messagingSenderId: "1040433436826",
  appId: "1:1040433436826:web:5a907c78d7f1b0a43f2723",
  measurementId: "G-XZPNSJ5N0F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
