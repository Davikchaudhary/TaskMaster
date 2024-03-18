import React, { useEffect, useState } from "react";
import API from "../../axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Boards from "../../components/Boards";
import CreateBoards from "../../components/CreateBoards";
import EditBoards from "../../components/EditBoards";

const Home = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openCreateBoards, setOpenCreateBoards] = useState(false);
  const [openEditBoards, setOpenEditBoards] = useState(false);
  const [createdBoards, setCreatedBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  const getUserDetail = async () => {
    try {
      const res = await API.get(`/user/${userId}`);
      setUserDetail(res.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserDetail();
    getBoards(); // Fetch boards when the component mounts
  }, []);

  const getBoards = async () => {
    try {
      const res = await API.get(`/user/${userId}/getboards`);
      setCreatedBoards(res.data); // Set the fetched boards to state
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const handleHamburger = () => {
    setOpenHamburger((prevState) => !prevState);
  };

  const handleAddBoard = () => {
    setOpenCreateBoards(true);
  };

  const handleCreateBoardClose = () => {
    setOpenCreateBoards(false); // Close the create board modal
  };

  const handleEditBoard = (board) => {
    setSelectedBoard(board);
    setOpenEditBoards(true); // Open the edit board modal
  };

  const handleEditBoardClose = () => {
    setOpenEditBoards(false); // Close the edit board modal
  };

  const handleCloseModal = () => {
    setOpenCreateBoards(false);
    getBoards(); // Fetch updated boards when a new board is created
  };

  const selectBoard = (board) => {
    setSelectedBoard(board); // Set selected board details to state
  };

  // Function to update boards after creation
  const updateBoards = () => {
    getBoards();
    handleCreateBoardClose(); // Close the create board modal after creating a board
  };

  return (
    <>
      <Navbar handleHamburger={handleHamburger} userDetail={userDetail} />
      <Sidebar
        openHamburger={openHamburger}
        handleAddBoard={handleAddBoard}
        createdBoards={createdBoards}
        setSelectedBoard={selectBoard}
        updateBoards={updateBoards}
        selectedBoard={selectedBoard}
        setOpenEditBoards={setOpenEditBoards}
      />
      <h1 className="">Select a board to start using TaskMaster</h1>
  
      {selectedBoard && <Boards selectedBoard={selectedBoard} />}
      {openCreateBoards && (
        <CreateBoards
          handleCloseModal={handleCloseModal}
          updateBoards={updateBoards}
        />
      )}
      {openEditBoards && (
        <EditBoards
          handleEditBoardClose={() => setOpenEditBoards(false)}
          updateBoards={updateBoards}
          selectedBoard={selectedBoard}
        />
      )}
    </>
  );
};

export default Home;
