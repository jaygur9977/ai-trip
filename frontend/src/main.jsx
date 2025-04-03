

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Navbar from './components/Navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';

import Layout from'./components/Layout.jsx'
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, 
  },
  {
    path: "/navbar",
    element: <Navbar />,  
  },

  {
    path: "/trip",
    element: <Layout />,
  },
 
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />, 
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_API}>
    <ToastContainer/>
    <Navbar/>
    <RouterProvider router={router} />
  
  </GoogleOAuthProvider>;
  </StrictMode>
);
