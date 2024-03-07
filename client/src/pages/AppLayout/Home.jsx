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

  useEffect(() => {
    // Fetch boards from the API when the component mounts
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/boards');
      setCreatedBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

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
      await axios.post('http://localhost:5000/boards', { name: boardName });
      fetchBoards(); // Fetch updated list of boards after creating a new one
      setOpenCreateBoards(false);
    } catch (error) {
      console.error('Error creating board:', error);
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
