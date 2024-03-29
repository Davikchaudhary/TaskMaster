import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userpic from "../assets/images/user.svg";

const Navbar = ({ handleHamburger, userDetail }) => {
  const navigate = useNavigate();

  const [openUserDetails, setOpenUserDetails] = useState(false);

  const [logout, setLogOut] = useState(false);

  const handleLogOut = () => {
    setLogOut(true);
    // localStorage.removeItem('loggedIn');
    localStorage.removeItem("userId");
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleUserdetails = () => {
    setOpenUserDetails((p) => !p);
  };

  return (
    <nav className=" fixed top-0 z-50 w-full bg-sky-800 border-b border-sky-800 dark:bg-sky-800 dark:border-sky-800">
      <div className="px-4 py-3 lg:px-6 lg:pl-4 flex items-center justify-between">
        <div className="flex items-center justify-start">
          <button
            onClick={handleHamburger}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div className="flex items-center ms-2 md:me-24">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-violet-300 dark:text-violet-300">
              TaskMaster
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className={`flex items-center ms-3 sm:block`}>
            <div>
              <button
                onClick={handleUserdetails}
                type="button"
                className="flex text-sm p-1 rounded-full focus:ring-4 bg-sky-800 dark:bg-sky-800 hover:bg-gray-700 dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <img className="h-6 w-6" src={userpic} />
              </button>
            </div>
            <div
              className={`${
                openUserDetails ? "block" : "hidden"
              } z-50 absolute w-82 lg:my-4  lg:-mx-32  sm:my-10 sm:-mx-96 text-base list-none bg-gray-700 divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'
              id="dropdown-user`}
            >
              <div className="px-4 py-3" role="none">
                <p
                  className="text-sm overflow-auto w-full text-white dark:text-white"
                  role="none"
                >
                  {userDetail.uname}
                </p>
                <p
                  className="text-sm overflow-auto w-full font-medium text-white truncate dark:text-gray-300"
                  role="none"
                >
                  {userDetail.email}
                </p>
                <button
                  onClick={handleLogOut}
                  className="text-sm font-medium text-red-500 truncate dark:text-red-500"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
