const mongoose=require('mongoose');
const moment = require('moment');

require("./board.js");
const Board=mongoose.model("Board");
const Task=mongoose.model("Task");


const createTask = async (req, res) => {
    const { userId } = req.query;
    const { boardName } = req.params;
    const { title, description, priority, column } = req.body;
  
    try {
      // Find the board by name and user
      const board = await Board.findOne({ name: boardName, createdBy: userId });
  
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
  
      // Create a new task with status same as column
      const newTask = new Task({
        title,
        description,
        priority,
        status: column, // Set status same as column
        createdAt: moment().format('DD MMM YYYY HH:mm:ss'),
        updatedAt: moment().format('DD MMM YYYY HH:mm:ss'),
      });
  
      // Save the task
      await newTask.save();
  
      // Update the task's column in the board
      const updatedColumn = board.columns[column];
      updatedColumn.push(newTask._id);
      board.markModified(`columns.${column}`);
  
      // Update the board's lastModifiedAt
      board.lastModifiedAt = moment().format('DD MMM YYYY');
  
      // Save the updated board
      await board.save();
  
      console.log('Task created successfully:', newTask);
      res.status(201).json({ message: 'Task created successfully', newTask });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };


  const updateTask = async (req, res) => {
    const { userId } = req.query;
    const { boardName, taskId } = req.params;
    const { name, description, priority, status } = req.body;
  
    try {
      // Find the board by name and user
      const board = await Board.findOne({ name: boardName, createdBy: userId });
  
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
  
      // Check if the task exists in any of the board's columns
      let taskFound = false;
      for (const col of Object.keys(board.columns)) {
        if (board.columns[col].includes(taskId)) {
          taskFound = true;
          break;
        }
      }
  
      if (!taskFound) {
        return res.status(404).json({ error: 'Task not found for the board' });
      }
  
      // Find and update the task
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { name, description, priority, status },
        { new: true }
      );
      updatedTask.updatedAt = moment().format('DD MMM YYYY HH:mm:ss');
  
      // Remove the task from its current column
      for (const col of Object.keys(board.columns)) {
        const index = board.columns[col].indexOf(taskId);
        if (index > -1) {
          board.columns[col].splice(index, 1);
          break;
        }
      }
  
      // Update the task's column in the board
      if (board.columns[status]) {
        board.columns[status].push(updatedTask._id);
      }
  
      // Save the updated board
      await board.save();
  
      console.log('Task updated successfully:', updatedTask);
      res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.updateTask = updateTask;

const deleteTask = async (req, res) => {
    const { userId } = req.query;
    const { boardName, taskId } = req.params;
  
    try {
      // Find the board by name and user
      const board = await Board.findOne({ name: boardName, createdBy: userId });
  
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
  
      // Check if the task exists in any of the board's columns
      let taskFound = false;
      for (const col of Object.keys(board.columns)) {
        if (board.columns[col].includes(taskId)) {
          taskFound = true;
          break;
        }
      }
  
      if (!taskFound) {
        return res.status(404).json({ error: 'Task not found for the board' });
      }
  
      // Remove the task from its current column
      for (const col of Object.keys(board.columns)) {
        const index = board.columns[col].indexOf(taskId);
        if (index > -1) {
          board.columns[col].splice(index, 1);
          break;
        }
      }
  
      // Delete the task
      await Task.findByIdAndDelete(taskId);
  
      board.lastModifiedAt = moment().format('DD MMM YYYY HH:mm:ss');
  
      // Save the updated board
      await board.save();
  
      console.log('Task deleted successfully');
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.deleteTask = deleteTask;

const getTasks = async (req, res) => {
    const { userId } = req.query;
    const { boardName } = req.params;
  
    try {
      // Find the board by name and user, populating the tasks in each column
      const board = await Board.findOne({ name: boardName, createdBy: userId })
        .populate('columns.todo')
        .populate('columns.backlog')
        .populate('columns.inProgress')
        .populate('columns.completed');
  
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
  
      const allTasks = [
        ...board.columns.todo,
        ...board.columns.backlog,
        ...board.columns.inProgress,
        ...board.columns.completed,
      ];
  
      console.log('All tasks for the board:', allTasks);
      res.status(200).json({ tasks: allTasks });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.getTasks = getTasks;
  
const getTaskById = async (req, res) => {
    const { taskId } = req.params;
  
    try {
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json({ task });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.getTaskById = getTaskById;
  
  
  
  
  module.exports = { createTask ,updateTask,deleteTask,getTasks,getTaskById};
  