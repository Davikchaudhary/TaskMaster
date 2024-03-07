import React, { useState } from 'react';

const CreateBoards = ({ handleCloseModal }) => {
  const [closeBoard, setCloseBoard] = useState(true);

  const handleCloseBoard = () => {
    setCloseBoard(prevState => !prevState);
    handleCloseModal(); // Close the modal
  };

  return (
    <div id="crud-modal" className={`${closeBoard ? 'block':'hidden'} fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50`}>
      <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Create New Board</h3>
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
        <form className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Board Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Type Board name..."
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add new Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoards;
