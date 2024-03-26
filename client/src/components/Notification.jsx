import React from "react";
import API from "../axios";

const Notification = ({ isOpen, handleNotificationModal, notifications }) => {
  const acceptInvitation = async (notificationId) => {
    try {
      await API.post(`/notifications/${notificationId}/accept`);
      // Handle UI update upon successful acceptance
      handleNotificationModal(); // Close modal
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error accepting invitation:', error);
      // Handle error
    }
  };

  const declineInvitation = async (notificationId) => {
    try {
      await API.post(`/notifications/${notificationId}/reject`);
      // Handle UI update upon successful rejection
      handleNotificationModal(); // Close modal
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error declining invitation:', error);
      // Handle error
    }
  };


  return (
    <>
      <div
        id="crud-modal"
        className={`fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-md mx-auto dark:bg-gray-700 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold dark:text-white text-black">
              Notification Center
            </h3>
            <button
              onClick={handleNotificationModal}
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

          {notifications.map((notification) => (
            <div key={notification._id} className="relative w-full max-w-md mx-auto dark:bg-gray-700 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4">
                <h1 className="text-md  dark:text-white text-black">
                  {notification.sender.uname} has requested to join the {notification.board.name}
                </h1>
                <div className="flex flex-row">
                  <button
                    type="submit" 
                    onClick={() => acceptInvitation(notification._id)}
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2"
                  >
                    Accept
                  </button>
                  <button
                    type="submit" 
                    onClick={() => declineInvitation(notification._id)}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notification;
