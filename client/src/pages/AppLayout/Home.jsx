import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Tasks from '../../components/Tasks';
import axios from 'axios';
import {Redirect, useNavigate} from 'react-router-dom'

const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost/5000/user/:id")
    .then((response)=>{
      console.log(response)
      if(response.data.status==='ok'){
        setIsLoggedIn(true);
        setUsername(response.data.uname);
        setEmail(response.data.email);
      }
      else {
        setIsLoggedIn(false);
        navigate('/login');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("An error occurred. Please try again later.");
  });

  },[])

  if (!isLoggedIn) {
    <Redirect to="/login"/>
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
