import React, { useEffect, useState } from "react";
import API from "../axios";
const Invite = ({ handleInviteModal, inviteModal }) => {
  const [users,setusers] = useState([]);
  const [boards,setBoards] = useState([])
  useEffect(()=>{
    const setuserlist = async()=>{
      try{
        const userId = localStorage.getItem("userId");
        const data = await API.get('/users');
        const boards = await API.get(`/user/${userId}/getboards`)
        setBoards(boards.data)
        setusers(data.data)
        
      ;}
      catch(error){
        console.log(error)
      }
    }
    setuserlist();
  },[])
  console.log(boards)
  return (
    <>
      <div
        id="crud-modal"
        className={`fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ${
          inviteModal ? "" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-md mx-auto dark:bg-gray-700 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold dark:text-white text-black">
              Invite User
            </h3>
            <button
              onClick={handleInviteModal} // Add onClick handler to close modal
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
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Add Users
                </label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option value="">Select User</option>
                    {users.map((user)=>{
                      return(
                      <option>{user.uname}</option>);
                    })}           
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Add Boards
                </label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option value="">Select Boards</option>
                  {boards.map((board)=>{
                      return(
                      <option>{board.name}</option>);
                    })}
                </select>
              </div>
              <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-400 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Send Invitation
            </button>
          </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Invite;
