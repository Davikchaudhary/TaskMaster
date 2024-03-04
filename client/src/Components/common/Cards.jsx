import React from 'react';

const Cards = ({ tasks }) => {
  const toDoTasks = tasks.filter(task => task.category === 'To-do');
  const backlogTasks = tasks.filter(task => task.category === 'Backlog');
  const inProgressTasks = tasks.filter(task => task.category === 'In Progress');
  const completedTasks = tasks.filter(task => task.category === 'Completed');

  return (
    <div>
      <div className='grid gap-2 md:grid-cols-4'>

        {/* To-Do Tasks */}
        <div className='flex flex-col justify-center mt-3 p-4 border-2 border-gray-200 border-dotted rounded-lg dark:border-gray-400'>
          <h1 className='text-xl font-bold border-md border-b-2 w-full text-center border-slate-400 dark:text-pink text-black'>To-Do</h1>
          {toDoTasks.map(task => (
            <div key={task.id} className="relative w-full p-4 mt-4 overflow-hidden bg-purple shadow-lg rounded-2xl">
              <div className="w-full">
                <p className="text-lg font-medium text-gray-800">{task.name}</p>
                <p className="text-white">{task.description}</p>
                <p className="text-sm text-right font-medium text-blue-300">{task.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Backlog Tasks */}
        <div className='flex flex-col justify-center mt-3 p-4 border-2 border-gray-200 border-dotted rounded-lg dark:border-gray-400'>
          <h1 className='text-xl font-bold border-md border-b-2 w-full text-center border-slate-400 dark:text-pink text-black'>Backlog</h1>
          {backlogTasks.map(task => (
            <div key={task.id} className="relative w-full p-4 mt-4 overflow-hidden bg-purple shadow-lg rounded-2xl">
              <div className="w-full">
                <p className="text-lg font-medium text-gray-800">{task.name}</p>
                <p className="text-white">{task.description}</p>
                <p className="text-sm text-right font-medium text-blue-300">{task.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress Tasks */}
        <div className='flex flex-col justify-center mt-3 p-4 border-2 border-gray-200 border-dotted rounded-lg dark:border-gray-400'>
          <h1 className='text-xl font-bold border-md border-b-2 w-full text-center border-slate-400 dark:text-pink text-black'>In Progress</h1>
          {inProgressTasks.map(task => (
            <div key={task.id} className="relative w-full p-4 mt-4 overflow-hidden bg-purple shadow-lg rounded-2xl">
              <div className="w-full">
                <p className="text-lg font-medium text-gray-800">{task.name}</p>
                <p className="text-white">{task.description}</p>
                <p className="text-sm text-right font-medium text-blue-300">{task.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Completed Tasks */}
        <div className='flex flex-col justify-center mt-3 p-4 border-2 border-gray-200 border-dotted rounded-lg dark:border-gray-400'>
          <h1 className='text-xl font-bold border-md border-b-2 w-full text-center border-slate-400 dark:text-pink text-black'>Completed</h1>
          {completedTasks.map(task => (
            <div key={task.id} className="relative w-full p-4 mt-4 overflow-hidden bg-purple shadow-lg rounded-2xl">
              <div className="w-full">
                <p className="text-lg font-medium text-gray-800">{task.name}</p>
                <p className="text-white">{task.description}</p>
                <p className="text-sm text-right font-medium text-blue-300">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
