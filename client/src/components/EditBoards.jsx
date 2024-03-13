// EditBoards.js
import React, { useState, useEffect } from "react";
import API from "../axios";

const EditBoards = ({
  handleEditBoardClose,
  updateBoards,
  selectedBoard,
  editedBoardName,
  setEditedBoardName,
}) => {
  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    if (selectedBoard) {
      setBoardName(editedBoardName); // Set the board name to the edited board name
    }
  }, [selectedBoard, editedBoardName]);

  const handleChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const boardId = selectedBoard.id;
      const newName = boardName; // Use the updated board name from state

      // Make a PUT request to update the board name
      const res = await API.put(`/user/${userId}/board/${selectedBoard.name}`, {
        name: newName, // Send the new board name as part of the request body
      });

      console.log("Board name updated successfully:", res.data);
      updateBoards(); // Update the boards list
      handleEditBoardClose(); // Close the modal after updating the board
    } catch (error) {
      console.error("Error updating board name:", error);
    }
  };

  const handleCloseBoard = () => {
    handleEditBoardClose(); // Close the modal
  };

  return (
    <div
      id="crud-modal"
      className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-md mx-auto bg-gray-700 rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-white">Edit Board</h3>
          <button
            onClick={handleCloseBoard}
            className="text-gray-400 hover:text-gray-700 focus:outline-none"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Board Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={boardName}
                onChange={handleChange}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={`Type Board name... (current: ${
                  selectedBoard ? selectedBoard.name : ""
                })`}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-400 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Edit Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBoards;
