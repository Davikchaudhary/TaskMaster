const mongoose=require('mongoose');
const moment = require('moment');

require("./board.js");
const Board=mongoose.model("Board");
require("./userDetails");
const User = mongoose.model("UserInfo");

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    return res.json(board);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// module.exports = { getBoardById };

const getUserBoards = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('boards');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json(user.boards);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  

  const addUserBoard = async (req, res) => {
    const { name } = req.body;
    const userId = req.params.id;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const existingBoard = await Board.findOne({ name });
  
      if (existingBoard) {
        return res.status(400).json({ error: 'Board name must be unique' });
      }
  
      // Create default columns for the new board
      const columns = {
        todo: [],
        backlog: [],
        inProgress: [],
        completed: [],
      };
  
      // Create a new board
      const newBoard = await Board.create({
        name,
        createdBy: userId, // Assign the user ID as createdBy
        columns,
      });
  
      // Save the new board
      await newBoard.save();
  
      // Add the new board's ID to the user's boards array
      user.boards.push(newBoard._id);
      await user.save();
  
      res.status(201).json(newBoard);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.addUserBoard = addUserBoard;


const getUserBoardBYBoardname = async (req, res) => {
    const { userId, boardName } = req.params;
  
    try {
      // Find the UserInfo document by userId and populate the 'boards' field
      const user = await User.findById(userId).populate('boards');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the board with the specified boardName in the user's boards array
      const board = user.boards.find((board) => board.name === boardName);
  
      if (!board) {
        return res.status(404).json({ error: 'Board not found' });
      }
  
      res.status(200).json(board);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.getUserBoard = getUserBoard;

const updateBoardName = async (req, res) => {
    const { userId, boardName } = req.params;
    const { newName } = req.body;
  
    console.log('Updating board:', userId, boardName);
  
    try {
      if (!newName) {
        return res.status(400).json({ error: 'New board name is required' });
      }
  
      // Find the board by boardName and createdBy (userId)
      const board = await Board.findOne({ name: boardName, createdBy: userId });
  
      if (!board) {
        console.log('Board not found for user:', userId, boardName);
        return res.status(404).json({ error: 'Board not found for the user' });
      }
  
      // Check if the new name is the same as the existing name
      if (newName === board.name) {
        console.log('New name is the same as existing name');
        return res.status(400).json({ error: 'New board name must be different from the current name' });
      }
  
      // Check if the new name is already used by another board for the same user
      const existingBoard = await Board.findOne({ name: newName, createdBy: userId });
  
      if (existingBoard) {
        console.log('New name is already used for another board');
        return res.status(400).json({ error: 'Board name must be unique for the user' });
      }
  
      // Update the board name
      board.name = newName;
      board.lastModifiedAt = moment().format('DD MMM YYYY HH:mm:ss');
  
      // Save the updated board
      await board.save();
  
      console.log('Board updated successfully:', board);
      res.status(200).json({ message: 'Board updated successfully', updatedBoard: board });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.updateBoardName = updateBoardName;

const deleteBoard = async (req, res) => {
    const { userId, boardName } = req.params;
  
    try {
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the board by boardName and createdBy (userId)
      const board = await Board.findOne({ name: boardName, createdBy: userId });
  
      if (!board) {
        return res.status(404).json({ error: 'Board not found for the user' });
      }
  
      // Delete the board from the user's list of boards
      user.boards.pull(board._id);
      await user.save();
  
      // Delete the board itself
      await Board.findOneAndDelete({ name: boardName, createdBy: userId });
  
      console.log('Board deleted successfully:', board);
      res.status(200).json({ message: 'Board deleted successfully', deletedBoard: board });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//   exports.deleteBoard = deleteBoard;
  
  
  
  
  module.exports = { getUserBoards, getBoardById ,addUserBoard, getUserBoardBYBoardname,updateBoardName,deleteBoard};
