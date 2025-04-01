// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Navbar from './components/Navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import Login from './components/Trip.jsx';
import Layout from'./components/Layout.jsx'
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';


// Define routes here
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,  // Add the route for your App component
  },
  {
    path: "/navbar",
    element: <Navbar />,  // Add the route for your App component
  },

  {
    path: "/trip",
    element: <Layout />,  // Add the route for your App component
  },
  {
    path: "/login",
    element: <Login />,  // Add the route for your App component
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />, 
  },
  // You can add more routes here if needed
]);

// Create the root element and render the App wrapped in StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>

<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_API}>
    <ToastContainer/>
    <Navbar/>
    <RouterProvider router={router} />
  
  </GoogleOAuthProvider>;
  </StrictMode>
);
