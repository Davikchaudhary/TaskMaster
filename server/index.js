const express = require("express");
const app = express();
const mongoose=require('mongoose');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET= "KSABDBIB32KFBHB@B3KBFUI33BF92FUBF392YR"

const mongoURL = "mongodb+srv://davikchaudhary:taskmaster@cluster0.ikldpmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose
.connect(mongoURL,{
    useNewUrlParser: true,
})
.then(()=>{
    console.log("connected to database");
})
.catch(e=>console.log(e))


app.listen(5000,()=>{
    console.log("server started");
});


require("./userDetails");
const User = mongoose.model("UserInfo");

app.post("/register",async(req,res)=>{
    const {uname,email,password}= req.body;
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const olduser = await User.findOne({email});
        if(olduser){
        return  res.send({error: "User Exists"});
        }
        await User.create({
            uname,
            email,
            password: encryptedPassword,
        });
        res.send({status: "ok"});
    } catch (error) {
        res.send({status: "error"});
    }
});

app.post('/login-user', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const userId = user._id;
    
    if (!user) {
        return res.send({ error: "User Not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(user);
    if (passwordMatch) {
        // console.log(passwordMatch)
        const token = jwt.sign({userId}, JWT_SECRET);
        return res.status(201).json({status: "ok"});
    }

    res.json({ status: 'error', error: 'Invalid Password' });
});



require("./board");
const Board=mongoose.model("Board");

// Get all boards
app.get('/boards', (req, res) => {
    Board.find()
      .then(boards => res.json(boards))
      .catch(err => res.status(400).json('Error: ' + err));
  });


// Get a single board by ID
app.get('/boards/:id', (req, res) => {
    Board.findById(req.params.id)
      .then(board => res.json(board))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Create a new board
app.post('/boards', (req, res) => {
    const newBoard = new Board(req.body);
    newBoard.save()
      .then(() => res.json('Board added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  // Update a board by ID
app.put('/boards/:id', (req, res) => {
    Board.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.json('Board updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // Delete a board by ID
 app.delete('/boards/:id', (req, res) => {
    Board.findByIdAndDelete(req.params.id)
      .then(() => res.json('Board deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });



// const Column=mongoose.model("Column");

// GET all columns
app.get('/boards/:id/columns', async (req, res) => {
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.json(board.columns);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// CREATE a new column for a board
app.post('/boards/:id/columns', async (req, res) => {
    const newColumn = {
      name: req.body.name,
      tasks: req.body.tasks || []
    };
  
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      board.columns.push(newColumn);
      const updatedBoard = await board.save();
      res.status(201).json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

 
  



// UPDATE a column of a board by ID
  app.put('/boards/:boardId/columns/:columnId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      column.name = req.body.name || column.name;
      column.tasks = req.body.tasks || column.tasks;
  
      const updatedBoard = await board.save();
      res.json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  


 // DELETE a column of a board by ID
app.delete('/boards/:boardId/columns/:columnId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      board.columns.id(req.params.columnId).remove();
  
      const updatedBoard = await board.save();
      res.json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });





  
// GET a single column of a board by column ID
app.get('/boards/:boardId/columns/:columnId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      res.json(column);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  


//   const Task=mongoose.model("Column");




///Task apis



// GET tasks of a column by column ID
app.get('/boards/:boardId/columns/:columnId/tasks', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const tasks = column.tasks;
      res.json(tasks);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  // GET a single task of a column by task ID
app.get('/boards/:boardId/columns/:columnId/tasks/:taskId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // CREATE a new task for a column
app.post('/boards/:boardId/columns/:columnId/tasks', async (req, res) => {
    const newTask = {
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'Todo',
      subtasks: req.body.subtasks || []
    };
  
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      column.tasks.push(newTask);
      const updatedBoard = await board.save();
      res.status(201).json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  
// UPDATE a task of a column by ID
app.put('/boards/:boardId/columns/:columnId/tasks/:taskId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;
      task.subtasks = req.body.subtasks || task.subtasks;
  
      const updatedBoard = await board.save();
      res.json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  // DELETE a task of a column by ID
app.delete('/boards/:boardId/columns/:columnId/tasks/:taskId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      column.tasks.id(req.params.taskId).remove();
  
      const updatedBoard = await board.save();
      res.json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



//Subtask apis
// GET subtasks of a task by task ID
app.get('/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const subtasks = task.subtasks;
      res.json(subtasks);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  // GET a single subtask of a task by subtask ID
app.get('/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks/:subtaskId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const subtask = task.subtasks.id(req.params.subtaskId);
      if (!subtask) {
        return res.status(404).json({ message: 'Subtask not found' });
      }
  
      res.json(subtask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  


  // CREATE a new subtask for a task
app.post('/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks', async (req, res) => {
    const newSubtask = {
      title: req.body.title,
      isCompleted: req.body.isCompleted || false
    };
  
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.subtasks.push(newSubtask);
      const updatedBoard = await board.save();
      res.status(201).json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  // UPDATE a subtask of a task by ID
app.put('/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks/:subtaskId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const subtask = task.subtasks.id(req.params.subtaskId);
      if (!subtask) {
        return res.status(404).json({ message: 'Subtask not found' });
      }
  
      subtask.title = req.body.title || subtask.title;
      subtask.isCompleted = req.body.isCompleted || subtask.isCompleted;
  
      const updatedBoard = await board.save();
      res.json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  // DELETE a subtask of a task by ID
app.delete('/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks/:subtaskId', async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      const column = board.columns.id(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
  
      const task = column.tasks.id(req.params.taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.subtasks.id(req.params.subtaskId).remove();
  
      const updatedBoard = await board.save();
      res.json(updatedBoard);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  