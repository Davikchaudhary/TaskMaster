import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Tasks from '../../components/Tasks';
import axios from 'axios';

const Home = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=>{
    axios.post("http://localhost/5000/login-user"),{
      uname,
      email,
    }
    .then((response)=>{
      console.log(response)
      if(response.data.status==='ok'){
        
      }
    })

  },[])
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <Tasks />
    </>
  )
};

export default Home
