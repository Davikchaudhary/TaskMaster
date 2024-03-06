import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar';
import Tasks from '../../components/Tasks';

const Home = () => {

  
  return (
    <>
      <Navbar />
      <Sidebar />
      <Tasks />
    </>
  )
};

export default Home
