// Board.js

import React, { useState } from 'react';
import CreateTask from './CreateTask';
import Cards from './Cards';

const Board = ({ toggleSidebarAction, isSidebarOpen }) => {
  // State to hold tasks
  const [tasks, setTasks] = useState([]);

  // Function to add a new task to the tasks state
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <>
      <div className={`p-4 sm:ml-full transition-all ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {/* Pass addTask function as a prop to CreateTask component */}
          <CreateTask addTask={addTask} />
          {/* Pass tasks state as a prop to Cards component */}
          <Cards tasks={tasks} />
        </div>
      </div>
    </>
  );
};

export default Board;
