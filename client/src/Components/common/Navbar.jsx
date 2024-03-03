import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center bg-gray-800 text-white py-4 px-6">
      <div>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none focus:text-white"
        >
           <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transform transition-transform`}
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
    </nav>
  );
};

export default Navbar;
