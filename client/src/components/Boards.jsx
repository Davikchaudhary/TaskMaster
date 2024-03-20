import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateTasks from "./CreateTasks";
import EditTask from "./EditTask";
import API from "../axios";

const Boards = ({ selectedBoard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState({
    todo: [],
    backlog: [],
    inProgress: [],
    completed: [],
  });
  const [columnId, setColumnId] = useState("");
  const [createdByUname, setCreatedByUname] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const res = await API.get(`/user/${userId}`);
          console.log(res);
          setCreatedByUname(res.data.uname); // Assuming 'uname' is the field containing the username
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();

    const setTasksList = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await API.get(
          `/board/${selectedBoard.name}/tasks?userId=${userId}`
        );
        const data = res.data.tasks;
        console.log(data);
        const todotemp = data.filter((task) => task.status === "todo");
        setTasks((prev) => {
          return { ...prev, todo: todotemp };
        });
        const inptemp = data.filter((task) => task.status === "inProgress");
        setTasks((prev) => {
          return { ...prev, inProgress: inptemp };
        });
        const bltemp = data.filter((task) => task.status === "backlog");
        setTasks((prev) => {
          return { ...prev, backlog: bltemp };
        });
        const comptemp = data.filter((task) => task.status === "completed");
        setTasks((prev) => {
          return { ...prev, completed: comptemp };
        });
      } catch (error) {
        console.log(error);
      }
    };
    setTasksList();
  }, [selectedBoard]);

  const handleOpenModal = (columnId) => {
    setIsModalOpen(true);
    setColumnId(columnId);
  };

  const addTask = async (columnId, newTask) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await API.post(
        `/board/${selectedBoard.name}/tasks?userId=${userId}`,
        {
          ...newTask,
          column: columnId, // Include the column information in the request
        }
      );
      // Assuming the backend returns the newly created task
      const createdTask = res.data.newTask;
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        updatedTasks[columnId].push(createdTask);
        return updatedTasks;
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (columnId, taskIndex, taskId) => {
    try {
      const userId = localStorage.getItem("userId");
      console.log(taskId);
      await API.delete(
        `/board/${selectedBoard.name}/tasks/${taskId}?userId=${userId}`
      );
    } catch (error) {
      console.log(error);
    }
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[columnId].splice(taskIndex, 1);
      return updatedTasks;
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }
    console.log(source, destination);
    const userId = localStorage.getItem("userId");

    const updatedTasks = { ...tasks };
    const movedTask = updatedTasks[source.droppableId].splice(
      source.index,
      1
    )[0];
    await API.put(
      `/board/${selectedBoard.name}/tasks/${movedTask._id}?userId=${userId}`,
      {
        name: movedTask.title,
        description: movedTask.description,
        priority: movedTask.priority,
        status: destination.droppableId,
      }
    );
    console.log(movedTask);
    updatedTasks[destination.droppableId].splice(
      destination.index,
      0,
      movedTask
    );
    setTasks(updatedTasks);
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

  const handleEditTask = (columnId, taskIndex, task) => {
    setIsEditModalOpen(true);
    setTaskToEdit({ columnId, taskIndex, task });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-4 mt-20 sm:ml-64">
          {selectedBoard && (
            <div className="flex flex-col space-y-4">
              <h2 className="mb-4 text-2xl text-center p-2 font-bold dark:bg-rose-100 bg-rose-100">
                <span className="font-light"> Board Name: </span>{" "}
                {selectedBoard.name}
              </h2>
              <div className="flex justify-between  flex-col dark:bg-lime-100 bg-lime-100 p-2 ">
                <h3 className="font-light">Created by: {createdByUname}</h3>
                <h3 className="font-extralight">
                  Created on: {selectedBoard.createdAt}
                </h3>
                <h3 className="font-extralight">
                  last modified on: {selectedBoard.lastModifiedAt}
                </h3>
              </div>
            </div>
          )}

          <div className="flex mt-4 flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-10">
            {/* Todo Column */}
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col w-full sm:w-1/4 gap-2"
                >
                  <div className="flex justify-between rounded-xl bg-blue-400 p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-indigo-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="font-bold text-center text-black">
                        To-do
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">Last updated</p>
                    </div>
                    <div className="flex justify-center text-center rounded-lg text-white">
                      <button
                        onClick={() => handleOpenModal("todo")}
                        className="cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2"
                      >
                        Add Tasks
                      </button>
                    </div>
                  </div>
                  {tasks.todo.map((task, index) => (
                    <Draggable
                      key={index}
                      draggableId={`todo-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            className={`flex flex-col w-full p-2 mt-2 border border-gray-200 bg-blue-300 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-300`}
                          >
                            <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">
                              {task.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-900">
                              {task.description}
                            </p>
                            <div className="space-x-5 text-end">
                              <button
                                className="bg-gray-700 dark:text-white text-white dark:hover:bg-gray-500 hover:bg-gray-500 dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  handleEditTask(columnId, index, task)
                                }
                              >
                                Edit Task
                              </button>

                              <button
                                className="bg-gray-700 dark:text-white text-white  dark:hover:bg-gray-500 hover:bg-gray-500 dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  deleteTask("todo", index, task._id)
                                }
                              >
                                Delete Task
                              </button>
                            </div>
                            <div className="flex justify-end mt-2">
                              <span className="px-2 py-1 text-xs font-semibold text-blue-500 bg-blue-200 rounded-md mr-1">
                                {task.priority && (
                                  <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md mr-1">
                                    {priorityTag(task.priority)}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* Backlog Column */}
            <Droppable droppableId="backlog">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col w-full sm:w-1/4 gap-2"
                >
                  {/* Backlog Header */}
                  <div className="flex justify-between rounded-xl bg-red-400 p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="font-bold text-center text-black">
                        Backlog
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">Last updated</p>
                    </div>
                    <div className="flex justify-center text-center rounded-lg text-white">
                      <button
                        onClick={() => handleOpenModal("backlog")}
                        className="cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2"
                      >
                        Add Tasks
                      </button>
                    </div>
                  </div>
                  {tasks.backlog.map((task, index) => (
                    <Draggable
                      key={index}
                      draggableId={`backlog-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            className={`flex flex-col w-full p-2 mt-2 border border-gray-200 bg-red-300 rounded-lg shadow hover:bg-red-100 dark:bg-red-300`}
                          >
                            <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">
                              {task.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-900">
                              {task.description}
                            </p>
                            <div className="space-x-5 text-end">
                              <button
                                className="bg-gray-700 dark:text-white text-white dark:hover:bg-gray-500 hover:bg-gray-500 dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  handleEditTask(columnId, index, task)
                                }
                              >
                                Edit Task
                              </button>

                              <button
                                className="bg-gray-700 dark:text-white text-white  dark:hover:bg-gray-500 hover:bg-gray-500 dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  deleteTask("backlog", index, task._id)
                                }
                              >
                                Delete Task
                              </button>
                            </div>
                            <div className="flex justify-end mt-2">
                              <span className="px-2 py-1 text-xs font-semibold text-orange-500 bg-red-200 rounded-md mr-1">
                                {task.priority && (
                                  <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md mr-1">
                                    {priorityTag(task.priority)}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* In Progress Column */}
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col w-full sm:w-1/4 gap-2"
                >
                  {/* In Progress Header */}
                  <div className="flex justify-between rounded-xl bg-orange-400 p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center  justify-center rounded-full border border-orange-100 bg-orange-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-orange-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="font-bold text-center text-black">
                        In Progress
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">Last updated</p>
                    </div>
                    <div className="flex justify-center text-center rounded-lg text-white">
                      <button
                        onClick={() => handleOpenModal("inProgress")}
                        className="cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2"
                      >
                        Add Tasks
                      </button>
                    </div>
                  </div>
                  {tasks.inProgress.map((task, index) => (
                    <Draggable
                      key={index}
                      draggableId={`inProgress-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            className={`flex flex-col w-full p-2 mt-2 border border-gray-200 rounded-lg bg-orange-300 shadow hover:bg-orange-100 dark:bg-orange-300`}
                          >
                            <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">
                              {task.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-900">
                              {task.description}
                            </p>
                            <div className="space-x-5 text-end">
                              <button
                                className="bg-gray-700 dark:text-white text-white dark:hover:bg-gray-500 hover:bg-gray-500 dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  handleEditTask(columnId, index, task)
                                }
                              >
                                Edit Task
                              </button>

                              <button
                                className="bg-gray-700 dark:text-white text-white  dark:hover:bg-gray-500 hover:bg-gray-500 dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  deleteTask("inProgress", index, task._id)
                                }
                              >
                                Delete Task
                              </button>
                            </div>
                            <div className="flex justify-end mt-2">
                              <span className="px-2 py-1 text-xs font-semibold text-orange-500  bg-orange-200 rounded-md mr-1">
                                {task.priority && (
                                  <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md mr-1">
                                    {priorityTag(task.priority)}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* Completed Column */}
            <Droppable droppableId="completed">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col w-full sm:w-1/4 gap-2"
                >
                  {/* Completed Header */}
                  <div className="flex justify-between rounded-xl bg-green-400 p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-indigo-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="font-bold text-center text-black">
                        Completed
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">Last updated</p>
                    </div>
                    <div className="flex justify-center text-center rounded-lg text-white">
                      <button
                        onClick={() => handleOpenModal("completed")}
                        className="cursor-pointer rounded-lg bg-slate-600 hover:bg-slate-800 p-2"
                      >
                        Add Tasks
                      </button>
                    </div>
                  </div>
                  {tasks.completed.map((task, index) => (
                    <Draggable
                      key={index}
                      draggableId={`completed-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            className={`flex flex-col w-full p-2 mt-2 border border-gray-200 rounded-lg bg-green-300 shadow hover:bg-green-100 dark:bg-green-300`}
                          >
                            <h5 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-black">
                              {task.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-900">
                              {task.description}
                            </p>
                            <div className="space-x-5 text-end">
                              <button
                                className="bg-gray-700 dark:text-white text-white dark:hover:bg-gray-500 hover:bg-gray-500 dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  handleEditTask(columnId, index, task)
                                }
                              >
                                Edit Task
                              </button>

                              <button
                                className="bg-gray-700 dark:text-white  dark:hover:bg-gray-500 hover:bg-gray-500 text-white dark:bg-gray-700 p-2 rounded-md"
                                onClick={() =>
                                  deleteTask("completed", index, task._id)
                                }
                              >
                                Delete Task
                              </button>
                            </div>
                            <div className="flex justify-end mt-2">
                              <span className="px-2 py-1 text-xs font-semibold text-indigo-500 bg-green-200 rounded-md mr-1">
                                {task.priority && (
                                  <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md mr-1">
                                    {priorityTag(task.priority)}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {isModalOpen && (
            <CreateTasks
              onClose={() => setIsModalOpen(false)}
              columnId={columnId}
              addTask={addTask}
            />
          )}

          {isEditModalOpen && taskToEdit && (
            <EditTask
              isEditModalOpen={isEditModalOpen}
              taskToEdit={taskToEdit}
              closeEditModal={() => setIsEditModalOpen(false)}
            />
          )}
        </div>
      </DragDropContext>
    </>
  );
};

export default Boards;
