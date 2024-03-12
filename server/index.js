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

require("./board.js");
const Board=mongoose.model("Board");
const Task=mongoose.model("Task");



//signup
app.post("/register", async (req, res) => {
  const { uname, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User already exists" });
    }

    const newUser = await User.create({
      uname,
      email,
      password: encryptedPassword,
      boards: [],
    });

    const newBoard = await Board.create({
      name: "Default Board",
      createdBy: newUser._id,
      columns: {
        todo: [],
        backlog: [],
        inProgress: [],
        completed: [],
      },
    });

    await newBoard.save();

    newUser.boards.push(newBoard._id);
    await newUser.save();

    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ status: "error" });
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
        return res.status(201).json({status: "ok",userId});
    }

    res.json({ status: 'error', error: 'Invalid Password' });
});




// get userby id
app.get('/user/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error' });
  }
});


// getboardbyid
app.get('/boards/:id',async (req, res) => {
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
});



//get boards of a userby userid

app.get('/user/:id/getboards',async (req, res) => {
  try {
    // const board = await Board.findById(req.params.id);
    const user=await User.findById(req.params.id).populate('boards');
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }

    return res.json(user.boards);
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
}
});


// creating board api
app.post('/user/:id/addboards', async (req, res) => {
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

    res.status(201).json(newBoard,newBoard._id);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//get board by boardname
app.get('/user/:userId/board/:boardName', async (req, res) => {
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
});





// PUT update a board by userId and boardName
app.put('/user/:userId/board/:boardName', async (req, res) => {
  const { userId, boardName } = req.params;
  const { newName } = req.body;

  console.log('Updating board:', userId, boardName);

  try {
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
    board.lastModifiedAt = new Date();

    // Save the updated board
    await board.save();

    console.log('Board updated successfully:', board);
    res.status(200).json({ message: 'Board updated successfully', updatedBoard: board });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// DELETE a board by userId and boardName
app.delete('/user/:userId/board/:boardName', async (req, res) => {
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
});

//Post the task
const moment = require('moment');

app.post('/board/:boardName/tasks', async (req, res) => {
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
      createdAt: moment().format('DD MMM YYYY'),
      updatedAt: moment().format('DD MMM YYYY'),
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
});



// PUT update a task for a board
app.put('/board/:boardName/tasks/:taskId', async (req, res) => {
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
});







// DELETE a task for a board
 app.delete('/board/:boardName/tasks/:taskId', async (req, res) => {
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
    for (const col of Object.keys(board.columns)) {
      const index = board.columns[col].indexOf(taskId);
      if (index > -1) {
        board.columns[col].splice(index, 1);
        break;
      }
    }

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
});



// get all task of a board
app.get('/board/:boardName/tasks', async (req, res) => {
  const { userId } = req.query;
  const { boardName } = req.params;

  try {
    // Find the board by name and user
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
});


// gettting single task by id
app.get('/tasks/:taskId', async (req, res) => {
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
});
