
// import React, { useEffect, useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { FcGoogle } from "react-icons/fc";



// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem('user'));
//     if (savedUser) {
//       setUser(savedUser);
//     }
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
//         headers: {
//           Authorization: `Bearer ${tokenResponse.access_token}`,
//           Accept: 'application/json'
//         }
//       }).then((res) => {
//         const userData = {
//           uid: res.data.id,
//           email: res.data.email,
//           name: res.data.name,
//           picture: res.data.picture
//         };
//         localStorage.setItem('user', JSON.stringify(userData));
//         setUser(userData);
//         saveUserToDatabase(userData);
//       }).catch(error => {
//         console.error('Error fetching user profile:', error);
//       });
//     },
//     onError: (error) => {
//       console.error('Login Error:', error);
//     }
//   });

//   const saveUserToDatabase = async (userData) => {
//     try {
//       await axios.post('/api/users', {
//         googleId: userData.uid,
//         email: userData.email,
//         name: userData.name,
//         avatar: userData.picture
//       });
//     } catch (error) {
//       console.error('Error saving user:', error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <div className='flex justify-between items-center'>
//       <img className='p-3 rounded-md' src="/logoipsum-343.svg" alt="Logo" />
      
//       {user ? (
//         <div className="flex items-center gap-2">
//           <img 
//             src={user.picture} 
//             alt={user.name}
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="text-sm font-medium ">{user.name}</span>
//           <button 
//             onClick={logout}
//             className="text-sm mr-4 text-white hover:text-green-300 bg-gray-500 p-2 rounded-md"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <button
//           type="button"
//           className="text-white mr-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
//           onClick={() => login()}
//         >
//           <FcGoogle className="inline mr-2" /> Login
//         </button>
//       )}
//     </div>
//   );
// };

// export default Navbar;




// import React, { useEffect, useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { FcGoogle } from "react-icons/fc";



// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem('user'));
//     if (savedUser) {
//       setUser(savedUser);
//     }
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
//         headers: {
//           Authorization: `Bearer ${tokenResponse.access_token}`,
//           Accept: 'application/json'
//         }
//       }).then((res) => {
//         const userData = {
//           uid: res.data.id,
//           email: res.data.email,
//           name: res.data.name,
//           picture: res.data.picture
//         };
//         localStorage.setItem('user', JSON.stringify(userData));
//         setUser(userData);
//         saveUserToDatabase(userData);
//       }).catch(error => {
//         console.error('Error fetching user profile:', error);
//       });
//     },
//     onError: (error) => {
//       console.error('Login Error:', error);
//     }
//   });

//   const saveUserToDatabase = async (userData) => {
//     try {
//       await axios.post('/api/users', {
//         googleId: userData.uid,
//         email: userData.email,
//         name: userData.name,
//         avatar: userData.picture
//       });
//     } catch (error) {
//       console.error('Error saving user:', error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <div className='flex justify-between items-center'>
//       <img className='p-3 rounded-md' src="/logoipsum-343.svg" alt="Logo" />
      
//       {user ? (
//         <div className="flex items-center gap-2">
//           <img 
//             src={user.picture} 
//             alt={user.name}
//             className="w-8 h-8 rounded-full"
//           />
//           <span className="text-sm font-medium ">{user.name}</span>
//           <button 
//             onClick={logout}
//             className="text-sm mr-4 text-white hover:text-green-300 bg-gray-500 p-2 rounded-md"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <button
//           type="button"
//           className="text-white mr-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
//           onClick={() => login()}
//         >
//           <FcGoogle className="inline mr-2" /> Login
//         </button>
//       )}
//     </div>
//   );
// };

// export default Navbar;




import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when resizing to larger screens
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        setIsMobileMenuOpen(false);
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
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 bg-white border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              className="h-8 w-auto md:h-10" 
              src="/logoipsum-343.svg" 
              alt="Logo" 
              loading="lazy"
            />
          </div>

          {/* Desktop Navigation - shows on md screens and up */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                  loading="lazy"
                />
                <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                  {user.name}
                </span>
                <button 
                  onClick={logout}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="flex items-center text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-2 rounded-md transition-colors duration-200"
              >
                <FcGoogle className="text-lg mr-2" /> 
                <span className="hidden sm:inline">Sign in</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu button - shows on small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - shows on small screens */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {user ? (
            <div className="flex flex-col items-center space-y-4 py-4">
              <img 
                src={user.picture} 
                alt={user.name}
                className="w-12 h-12 rounded-full"
                loading="lazy"
              />
              <span className="text-base font-medium text-gray-700">{user.name}</span>
              <button 
                onClick={logout}
                className="w-full max-w-xs mx-auto text-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => login()}
              className="w-full max-w-xs mx-auto flex items-center justify-center text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-3 rounded-md transition-colors duration-200"
            >
              <FcGoogle className="text-xl mr-3" /> 
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
