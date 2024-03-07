import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Tasks from '../../components/Tasks';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate for React Router v6

const Home = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/api/authenticate");
        if (response.data) {
          setIsLoggedIn(true);
          setUserData(response.data);
        } else {
          setIsLoggedIn(false);
          navigate('/login'); // Navigate to the login page
        }
      } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
      }
    };

    checkLoggedIn();
  }, [navigate]);

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return null; // or you can return <Navigate to="/login" /> if you're using React Router
  }
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <Tasks />
    </>
  )
};

export default Home
