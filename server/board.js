const mongoose = require('mongoose');
const moment = require('moment');

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
    type: String, // Change to String type
    required: true,
    default: () => {
      return moment().format('DD MMM YYYY'); // Format: "09 Mar 2024"
    },
  },
  updatedAt: {
    type: String, // Change to String type
    required: true,
    default: () => {
      return moment().format('DD MMM YYYY'); // Format: "09 Mar 2024"
    },
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
    unique:true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String, // Change to String type
    required: true,
    default: () => {
      return moment().format('DD MMM YYYY HH:mm:ss') // Format: "09 Mar 2024"
    },
  },
  lastModifiedAt: {
    type: String, // Change to String type
    required: true,
    default: () => {
      return moment().format('DD MMM YYYY HH:mm:ss') // Format: "09 Mar 2024"
    },
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"UserInfo",
  }

  ],
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


