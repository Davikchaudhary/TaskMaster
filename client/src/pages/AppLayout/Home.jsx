import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Tasks from '../../components/Boards';
import CreateBoards from '../../components/CreateBoards';

const Home = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openCreateBoards, setOpenCreateBoards] = useState(false);
  const [createdBoards, setCreatedBoards] = useState([]);

 

  const handleHamburger = () => {
    setOpenHamburger(prevState => !prevState);
  };

  const handleAddBoard = () => {
    setOpenCreateBoards(true);
  };

  const handleCloseModal = () => {
    setOpenCreateBoards(false);
  };

  const handleCreateBoard = async (boardName) => {
    try {
      // Send a POST request to your backend API
      const response = await axios.post('/boards', { boardName });
      console.log(response.data); // Log the response from the backend
      setCreatedBoards(prevBoards => [...prevBoards, boardName]);
      setOpenCreateBoards(false);
    } catch (error) {
      console.error('Error creating board:', error);
      // Handle error if needed
    }
  };

 

  return (
    <>
      <Navbar handleHamburger={handleHamburger}/>
      <Sidebar  openHamburger={openHamburger} handleAddBoard={handleAddBoard} createdBoards={createdBoards}/>
      <Tasks />
      {openCreateBoards && <CreateBoards handleCloseModal={handleCloseModal} handleCreateBoard={handleCreateBoard} />}
    </>
  );
};

export default Home;
