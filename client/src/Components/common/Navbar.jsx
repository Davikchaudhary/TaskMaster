import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="flex items-center justify-between bg-grey text-white py-4 px-6">
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
      <div className='flex flex-row items-center text-white'>
        <svg className="h-6 w-6" viewBox="0 0 60.671 60.671" fill="#ffffff">
            <ellipse cx="30.336" cy="12.097" rx="11.997" ry="12.097"></ellipse>
            <path d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9C48.354,35.818,42.661,30.079,35.64,30.079z"></path>
        </svg>
        <p className="text-base">Name</p>
      </div>
    </nav>
  );
};

export default Navbar;
