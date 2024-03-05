// const mongoose = require("mongoose");

// const BoardSchema = new mongoose.Schema(
//     {
//         uname: String,
//         email: {type: String, unique: true},
//         password: String,
//     },
//     {
//         collection: "Board",
//     }
// );

// mongoose.model("Board", BoardSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subtask Schema
const subtaskSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

// Task Schema
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
  subtasks: [subtaskSchema]
});

// Column Schema
const columnSchema = new Schema({
  name: { type: String, required: true },
  tasks: [taskSchema]
});

// Board Schema
const boardSchema = new Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  columns: [columnSchema]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;

