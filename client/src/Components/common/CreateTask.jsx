import React, { useState } from 'react';

const CreateTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggles the state of isModalOpen
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      
          <div className=' flex justify-center'>
            <button
              className='block text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-900 dark:focus:ring-gray-300'
              type="button"
              onClick={handleModal}
            >
              Create Task Group
            </button>

            <div
              id="task-card"
              className={`${
                isModalOpen ? '' : 'hidden'
              } fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50`}
            >

              <div className="relative p-4 w-full max-w-2xl max-h-full bg-grey rounded-lg shadow-lg">

                <form>
                  <div className='grid gap-6 mb-6 md:grid-cols-2'>

                    <div className='border-2 border-purple rounded-xl p-2'>
                      <label htmlFor="taskName" className='block mb-1 text-sm font-medium text-gray-900 dark:text-pink'>Task Name:</label>
                      <input
                        type='text'
                        id="taskName"
                        className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Task Name..."
                        required
                      />
                    </div>

                    <div className="border-2 rounded-xl p-2  border-purple">
                        <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-900 dark:text-pink">Category</label>
                        <select id="category" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option select="">To-do</option>
                            <option value="TV">Backlog</option>
                            <option value="PC">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="border-2 rounded-xl p-2 col-span-2  border-purple">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-pink">Task Description/Notes</label>
                        <textarea id="description" rows="4" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write task description here..."></textarea>                    
                    </div>
                    
                  </div>
                  <div className='flex justify-between'>

                  <button type='submit' className='text-white bg-gray-700 hover-bg-gray-900 focus:ring-4 focus: outlined-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"'>Submit</button>

                  <button type='button' onClick={handleCloseModal} className='text-white bg-red-700 hover-bg-gray-900 focus:ring-4 focus: outlined-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={handleCloseModal}'>Close</button>
                  </div>

                </form>

              </div>
            </div>
          </div>
    </>
  );
};

export default CreateTask;
