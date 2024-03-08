import React, { useEffect, useState } from 'react';
import axios from 'axios'
import API from '../../axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Boards from '../../components/Boards';
import CreateBoards from '../../components/CreateBoards';

const Home = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openCreateBoards, setOpenCreateBoards] = useState(false);
  const [createdBoards, setCreatedBoards] = useState([]);
  const [userDetail , setUserDetail] = useState({});
  const [error, setError] = useState("");
  


  
  const userId =localStorage.getItem('userId');


  
  const getUserDetail = async () => {
    
    try {
      const res = await axios.get(`http://localhost:5000/user/${userId}`);
      
      console.log(res.data)

      
      setUserDetail(res.data)
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(()=>{
    getUserDetail();
  },[])

  console.log(userDetail.uname)

  const handleHamburger = () => {
    setOpenHamburger(prevState => !prevState);
  };

  const handleAddBoard = () => {
    setOpenCreateBoards(true);
  };

  const handleCloseModal = () => {
    setOpenCreateBoards(false);
  };


  return (
    <>
      <Navbar handleHamburger={handleHamburger} userDetail={userDetail} />
      <Sidebar  openHamburger={openHamburger} handleAddBoard={handleAddBoard} createdBoards={createdBoards}/>
      <Boards />
      {openCreateBoards && <CreateBoards handleCloseModal={handleCloseModal}  />}
    </>
  );
};

export default Home;
