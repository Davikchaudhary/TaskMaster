import React, { useState, useEffect } from 'react';

const Sidebar = ({ isOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [favoriteTasks, setFavoriteTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  

  useEffect(() => {
    if (isOpen && !isMenuOpen) {
      toggleMenu();
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, taskName.trim()]);
      setTaskName(''); 
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleAddToFavorites = (index) => {
    const taskToAdd = tasks[index];
    setTasks(tasks.filter((task, i) => i !== index)); 
    setFavoriteTasks([...favoriteTasks, taskToAdd]); 
  };
  
  const handleRemoveFromFavorites = (index) => {
    const taskToRemove = favoriteTasks[index];
    setFavoriteTasks(favoriteTasks.filter((task, i) => i !== index)); 
    setTasks([...tasks, taskToRemove]); 
  };

  
  return (
    <>
    
     <aside
        id="separator-sidebar"
        className={`fixed left-0 z-40 w-full sm:w-72 h-screen sm:h-full transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-800">

        <div className="space-y-2 font-medium">
          <a
            href='/home'
            className="flex justify-center p-2 w-full text-xl hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span>TaskMaster</span>
           
          </a>
        </div>

         {/* Menu start */}
         <ul className='pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray'>
            <li>
              <button onClick={toggleMenu} className="flex justify-between p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3">Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform transition-transform ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              <ul className={`pl-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="flex-1 ms-3 whitespace-nowrap">User</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="flex-1 ms-3 whitespace-nowrap">Invite</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

        {/* favourite */}
        <div id='favoriteSection'>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray">
            <li>
              <a href="#" className="flex justify-between items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <span className="ms-3">Favourite</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              </a>
              <ul className="pl-4">
                {favoriteTasks.map((task, index) => (
                  <li key={index}>
                    <div className="flex items-center justify-between p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 0 0-1 1v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1H3zm10 2h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm0 4h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm-5 4h7a1 1 0 1 1 0 2h-7a1 1 0 0 1 0-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        {task}
                      </span>
                      <button onClick={() => handleRemoveFromFavorites(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            </li>
          </ul>
        </div>

        {/* Task section */}
        <div id='tasksList'>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray">
              <li>
                <div className="flex justify-between items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                  <span className='ms-3'>Create Task List</span>
                  
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="task-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                  <input 
                    type="text" 
                    id="task-input" 
                    className="block w-full ms-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={taskName} 
                    onChange={(e) => setTaskName(e.target.value)} 
                  />
                  <button onClick={handleAddTask} className="p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
                <ul className="pl-4">
                  {tasks.map((task, index) => (
                    <li key={index}>
                      <div className="flex items-center justify-between p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 0 0-1 1v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1H3zm10 2h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm0 4h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zm-5 4h7a1 1 0 1 1 0 2h-7a1 1 0 0 1 0-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {task}
                        </span>
                        <button onClick={() => handleAddToFavorites(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18l-1.45-1.4C4.52 12.77 2 10.3 2 7.5 2 5.02 4.02 3 6.5 3c1.54 0 3.04.99 3.57 2.36h1.87C10.46 3.99 11.96 3 13.5 3 15.98 3 18 5.02 18 7.5c0 2.8-2.52 5.27-6.55 9.1L10 18z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteTask(index)} className="ml-2 text-white hover:text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>


      </div>
    </aside>
    </>
  );
}

export default Sidebar;

