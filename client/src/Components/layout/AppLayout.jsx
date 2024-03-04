// AppLayout.js
import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Board from '../common/Board';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="grid-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <Board toggleSidebarAction={toggleSidebar} isSidebarOpen={sidebarOpen}/>
    </div>
  );
};

export default AppLayout;