import React, { useState } from "react";
import closepic from "../assets/images/close.svg";
import editpic from "../assets/images/edit.svg";
import API from "../axios"; // Import API functions;
import invitePic from '../assets/images/invitePic.svg';
import createBoardPic from '../assets/images/createBoard.svg';


const Sidebar = ({
  openHamburger,
  handleAddBoard,
  createdBoards,
  setSelectedBoard,
  updateBoards,
  selectedBoard,
  setOpenEditBoards,
  handleInviteModal
}) => {
  const [showBoards, setShowBoards] = useState(false);

  const toggleShowBoards = () => {
    setShowBoards((prevState) => !prevState);
  };

  const handleEditBoard = (board) => {
    setSelectedBoard(board);
    setOpenEditBoards(true);
  };

  const handleDeleteBoard = async (boardName) => {
    try {
      const userId = localStorage.getItem("userId");

      // Make a DELETE request to delete the board
      await API.delete(
        `/user/${userId}/board/${encodeURIComponent(boardName)}`
      );

      // Update the boards list after deletion
      updateBoards();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        openHamburger ? "translate-x-0" : "-translate-x-full"
      } bg-sky-800 border-r border-sky-800 sm:translate-x-0 dark:bg-sky-800 dark:border-sky-800`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-sky-800 dark:bg-sky-800">
        <ul className="space-y-2 mt-2 font-medium">
          <li>
            <button
              onClick={handleAddBoard}
              className="flex items-center w-full p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <img src={createBoardPic} className="h-6 w-6"/>
              <span className="ms-3">Create Boards</span>
            </button>
          </li>
        </ul>
        <ul className="space-y-2 mt-2 font-medium">
          <li>
            <button
              onClick={toggleShowBoards}
              className="flex items-center w-full p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <svg
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M10 21h4v-4h-4v4zm-7-7h4v-4H3v4zm0-5h4V5H3v4zm7 7h4v-4h-4v4zM3 3v4h4V3H3zm14 4h4V3h-4v4zm0 5h4v-4h-4v4zM10 3h4V3h-4v4zm7 14v-4h-4v4h4zm-7 4v-4H3v4h4z"
  />
</svg>

              <span className="ms-3">
                {showBoards ? "Hide" : "Show"} Boards
              </span>
            </button>
          </li>
        </ul>
        {showBoards && (
          <div className="px-3 pb-4 border-t-2 overflow-y-auto bg-gray-800 dark:bg-gray-800">
            <ul>
              {createdBoards.map((board, index) => (
                <li key={index}>
                  <div className="flex">
                    <button
                      className="flex text-center justify-center w-full p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
                      onClick={() => setSelectedBoard(board)}
                    >
                      {board.name}
                    </button>
                    <div className="flex">
                      <button onClick={() => handleEditBoard(board)}>
                        <img className="h-10 w-10" src={editpic} alt="Edit" />
                      </button>

                      <button onClick={() => handleDeleteBoard(board.name)}>
                        <img
                          className="h-10 w-10"
                          src={closepic}
                          alt="Delete"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
             <ul className="space-y-2 mt-2 font-medium">
          <li>
            <button
              onClick={handleInviteModal}
              className="flex items-center w-full p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <img className="h-6 w-6" src={invitePic}/>

              <span className="ms-3">Invite</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
