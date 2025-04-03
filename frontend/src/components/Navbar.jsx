
import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";



const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
          Accept: 'application/json'
        }
      }).then((res) => {
        const userData = {
          uid: res.data.id,
          email: res.data.email,
          name: res.data.name,
          picture: res.data.picture
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        saveUserToDatabase(userData);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
    },
    onError: (error) => {
      console.error('Login Error:', error);
    }
  });

  const saveUserToDatabase = async (userData) => {
    try {
      await axios.post('/api/users', {
        googleId: userData.uid,
        email: userData.email,
        name: userData.name,
        avatar: userData.picture
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className='flex justify-between items-center'>
      <img className='p-3 rounded-md' src="/logoipsum-343.svg" alt="Logo" />
      
      {user ? (
        <div className="flex items-center gap-2">
          <img 
            src={user.picture} 
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium ">{user.name}</span>
          <button 
            onClick={logout}
            className="text-sm mr-4 text-white hover:text-green-300 bg-gray-500 p-2 rounded-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="text-white mr-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => login()}
        >
          <FcGoogle className="inline mr-2" /> Login
        </button>
      )}
    </div>
  );
};

export default Navbar;