import React, { useState } from 'react';
import CreateTasks from './CreateTasks'; 

const Boards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState({
    todo: [],
    backlog: [],
    inProgress: [],
    completed: []
  });
  const [columnId, setColumnId] = useState(''); // Define columnId state

  const handleOpenModal = (columnId) => {
    setIsModalOpen(true);
    setColumnId(columnId); // Set the columnId state
  };
  
  const addTask = (columnId, newTask) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      if (!Array.isArray(updatedTasks[columnId])) {
        updatedTasks[columnId] = []; // Initialize as an empty array if not already
      }
      updatedTasks[columnId].push(newTask); // Push the new task to the array
      return updatedTasks;
    });
  };

  // Inside the editTask function
const editTask = (columnId, taskIndex, updatedTask) => {
  setTasks(prevTasks => {
    const updatedTasks = { ...prevTasks };
    updatedTasks[columnId][taskIndex] = updatedTask;
    return updatedTasks;
  });
  // Open the modal with the task details for editing
  setIsModalOpen(true);
  setColumnId(columnId);
  setTaskToEdit(updatedTask);
};

// Add taskToEdit state
const [taskToEdit, setTaskToEdit] = useState(null);

  const deleteTask = (columnId, taskIndex) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[columnId].splice(taskIndex, 1);
      return updatedTasks;
    });
  };

  return (
    <div className="p-4 mt-20 sm:ml-64">
      <div className="flex flex-col">
        <h2 className="mb-4 text-2xl text-center p-2 font-bold">Board Name</h2>
        <div className="flex justify-between">
          <h3 className="text-right">Created on: date time</h3>
          <h3 className="text-right">Created by: Username</h3>
          <h3 className="text-right">last modified on: date time</h3>
        </div>
        <div className="flex justify-around">
          <h3 className="text-right bg-rose-300 p-1 rounded-xl text-black font-semibold">Immediate</h3>
          <h3 className="text-right bg-orange-300 p-1 rounded-xl text-black font-semibold">High</h3>
          <h3 className="text-right bg-blue-300 p-1 rounded-xl text-black font-semibold">Medium</h3>
          <h3 className="text-right bg-green-300 p-1 rounded-xl text-black font-semibold">Low</h3>
        </div>
      </div>

      <div className='flex mt-2 flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-10'> 
        {/* Todo Column */}
        <div className='flex flex-col w-full sm:w-1/4 gap-2'>
          <div className="flex justify-between rounded-xl bg-blue-400 p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-bold text-center text-black">To-do</h2>
              <p className="mt-2 text-sm text-gray-600">Last updated</p>
            </div>
            <div className='flex justify-center text-center rounded-lg text-white'>
              <button onClick={() => handleOpenModal('todo')} className='cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2'>Add Tasks</button>
            </div>
          </div>
          {/* Task List */}
          {tasks.todo.map((task, index) => (
            <div key={index} className={`flex flex-col w-full p-2 mt-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-rose-300 ${task.priority}`}>
              <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">{task.name}</h5>
              <p className="font-normal text-gray-700 dark:text-gray-900">{task.description}</p>
              <div className='space-x-5 text-end'>
                <button onClick={() => editTask('todo', index, { name: 'Updated Task', description: 'Updated Description', priority: 'bg-rose-300' })}>Edit Task</button>
                <button onClick={() => deleteTask('todo', index)}>Delete Task</button>
              </div>
            </div>
          ))}
        </div>

        {/* Backlog Column */}
        <div className='flex flex-col w-full sm:w-1/4 gap-2'>
          <div className="flex justify-between rounded-xl bg-red-400 p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-bold text-center text-black">Backlog</h2>
              <p className="mt-2 text-sm text-gray-600">Last updated</p>
            </div>
            <div className='flex justify-center text-center rounded-lg text-white'>
              <button onClick={() => handleOpenModal('backlog')} className='cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2'>Add Tasks</button>
            </div>
          </div>
          {/* Task List */}
          {tasks.backlog.map((task, index) => (
            <div key={index} className={`flex flex-col w-full p-2 mt-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-orange-300 ${task.priority}`}>
              <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">{task.name}</h5>
              <p className="font-normal text-gray-700 dark:text-gray-900">{task.description}</p>
              <div className='space-x-5 text-end'>
                <button onClick={() => editTask('backlog', index, { name: 'Updated Task', description: 'Updated Description', priority: 'bg-orange-300' })}>Edit Task</button>
                <button onClick={() => deleteTask('backlog', index)}>Delete Task</button>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div className='flex flex-col w-full sm:w-1/4 gap-2'>
          {/* In Progress Header */}
          <div className="flex justify-between rounded-xl bg-orange-400 p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center  justify-center rounded-full border border-orange-100 bg-orange-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-bold text-center text-black">In Progress</h2>
              <p className="mt-2 text-sm text-gray-600">Last updated</p>
            </div>
            <div className='flex justify-center text-center rounded-lg text-white'>
              <button onClick={() => handleOpenModal('inProgress')} className='cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2'>Add Tasks</button>
            </div>
          </div>
          {/* Task List */}
          {tasks.inProgress.map((task, index) => (
            <div key={index} className={`flex flex-col w-full p-2 mt-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-orange-300 ${task.priority}`}>
              <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">{task.name}</h5>
              <p className="font-normal text-gray-700 dark:text-gray-900">{task.description}</p>
              <div className='space-x-5 text-end'>
                <button onClick={() => editTask('inProgress', index, { name: 'Updated Task', description: 'Updated Description', priority: 'bg-orange-300' })}>Edit Task</button>
                <button onClick={() => deleteTask('inProgress', index)}>Delete Task</button>
              </div>
            </div>
          ))}
        </div>

        {/* Completed Column */}
        <div className='flex flex-col w-full sm:w-1/4 gap-2'>
          {/* Completed Header */}
          <div className="flex justify-between rounded-xl bg-green-400 p-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-indigo-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-bold text-center text-black">Completed</h2>
              <p className="mt-2 text-sm text-gray-600">Last updated</p>
            </div>
            <div className='flex justify-center text-center rounded-lg text-white'>
              <button onClick={() => handleOpenModal('completed')} className='cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2'>Add Tasks</button>
            </div>
          </div>
          {/* Task List */}
          {tasks.completed.map((task, index) => (
            <div key={index} className={`flex flex-col w-full p-2 mt-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-orange-300 ${task.priority}`}>
              <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">{task.name}</h5>
              <p className="font-normal text-gray-700 dark:text-gray-900">{task.description}</p>
              <div className='space-x-5 text-end'>
                <button onClick={() => editTask('completed', index, { name: 'Updated Task', description: 'Updated Description', priority: 'bg-indigo-300' })}>Edit Task</button>
                <button onClick={() => deleteTask('completed', index)}>Delete Task</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && <CreateTasks onClose={() => setIsModalOpen(false)} columnId={columnId} addTask={addTask} taskToEdit={taskToEdit} />}
    </div>
  );
};

export default Boards;
