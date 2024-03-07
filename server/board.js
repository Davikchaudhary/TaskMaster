// // const mongoose = require("mongoose");

// // const BoardSchema = new mongoose.Schema(
// //     {
// //         uname: String,
// //         email: {type: String, unique: true},
// //         password: String,
// //     },
// //     {
// //         collection: "Board",
// //     }
// // );

// // mongoose.model("Board", BoardSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Subtask Schema
// const subtaskSchema = new Schema({
//   title: { type: String, required: true },
//   isCompleted: { type: Boolean, default: false }
// });

// // Task Schema
// const taskSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, default: '' },
//   status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
//   subtasks: [subtaskSchema]
// });

// // Column Schema
// const columnSchema = new Schema({
//   name: { type: String, required: true },
//   tasks: [taskSchema]
// });

// // Board Schema
// const boardSchema = new Schema({
//   name: { type: String, required: true },
//   isActive: { type: Boolean, default: false },
//   columns: {type:columnSchema,default:[]}
// });

// const Board = mongoose.model('Board', boardSchema);

// module.exports = Board;


// const Column = mongoose.model('Column', columnSchema);

// module.exports = Column;


// const Task = mongoose.model('Task', taskSchema);

// module.exports = Task;

// const Subtask = mongoose.model('Subtask', subtaskSchema);

// module.exports = Subtask;




const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['Immediate', 'High', 'Medium', 'Low'],
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'backlog', 'inProgress', 'completed'],
    default: 'todo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
},
  {
    collection:"Task",
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;



// const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  },
  columns: {
    todo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    backlog: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    inProgress: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
    completed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }],
  },
},
{
  collection:"Board",
}
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;


