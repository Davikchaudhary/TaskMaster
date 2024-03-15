import React, { useState } from 'react';

const CreateTasks = ({ onClose, columnId, addTask, taskToEdit }) => {
    const [formData, setFormData] = useState({
      name: taskToEdit ? taskToEdit.name : '',
      priority: taskToEdit ? taskToEdit.priority : '',
      description: taskToEdit ? taskToEdit.description : ''
    });
  
    // Handle changes to form fields
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      
      const newTask = {
        title: formData.name,
        description: formData.description,
        priority: formData.priority, // Use the mapped enum value
      };

      console.log(newTask)
      
      addTask(columnId, newTask);
      onClose();
    };
    
  const priorityTag = (priority) => {
    switch (priority) {
      case "Immediate":
        return "Immediate";
      case "High":
        return "High Priority";
      case "Medium":
        return "Medium Priority";
      case "Low":
        return "Low Priority";
      default:
        return "";
    }
  };
    
  return (
    <div id="crud-modal" className={`fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50`}>
      <div className="relative w-full max-w-md mx-auto bg-gray-700 rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-white">Create New Task</h3>
          <button
            onClick={onClose}
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
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Task Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name} // Add value attribute to bind input value to state
                onChange={handleChange} // Add onChange event to update state on input change
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Board name..."
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
              <select
                id="category"
                name="priority"
                value={formData.priority} // Add value attribute to bind select value to state
                onChange={handleChange} // Add onChange event to update state on select change
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select Priority</option>
                <option value="Immediate">Immediate</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description} // Add value attribute to bind textarea value to state
                onChange={handleChange} // Add onChange event to update state on textarea change
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write task description here"
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-400 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add new Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTasks;
