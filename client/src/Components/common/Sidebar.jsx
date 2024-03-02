import React, { useState } from 'react';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [tasks, setTasks] = useState([]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleMenu = () => {
    console.log(toggleMenu);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddTask = () => {
    const taskName = prompt('Enter the task:');
    if (taskName) {
      const newTask = taskName.trim();
      if (newTask !== '') {
        setTasks([...tasks, newTask]);
      }
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  
  return (
    <>

    <button
      onClick={handleToggleSidebar}
      data-drawer-target="separator-sidebar"
      data-drawer-toggle="separator-sidebar"
      aria-controls="separator-sidebar"
      type="button"
      className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span className="sr-only">Open sidebar</span>
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transform transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
    </button>

    <aside
      id="separator-sidebar"
      className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform ${
        sidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-800">

        <div className="space-y-2 font-medium">
          <button
            onClick={handleCloseSidebar}
            className="flex justify-between p-2 w-full text-xl hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span className="ms-3">TaskMaster</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transform transition-transform ${
                sidebarOpen ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
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

        <div id='favoriteSection'>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray">
            <li>
              <a href="#" className="flex justify-between items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                <span className="ms-3">Favourite</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              </a>
            </li>
          </ul>
        </div>


        <div id='tasksList'>
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray">
          <li>
            <button 
              onClick={handleAddTask}
              className="flex justify-between items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <span className='ms-3'>Create Task List</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>

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
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-300"
                    >
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

      </div>
    </aside>
    </>
  );
}

export default Sidebar;

