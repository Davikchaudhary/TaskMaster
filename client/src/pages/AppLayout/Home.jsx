import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Tasks from '../../components/Tasks';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
  axios.get("http://localhost:5000/users")
  .then((response) => {
    setUsername(response.data)
  })
  console.log(username)

  
  return (
    <>
      <Navbar username={username}/>
      <Sidebar />
      <Tasks />
    </>
  )
};

export default Home
