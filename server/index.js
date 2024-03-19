const express = require("express");
const app = express();
const mongoose=require('mongoose');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const moment = require('moment');
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

boardapi=require("./boardapis");
taskapi=require("./taskapis");



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





//login
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



//USERS
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




//BOARD

// getboardbyid
app.get('/boards/:id',boardapi.getBoardById);



//get boards of a userby userid

app.get('/user/:id/getboards',boardapi.getUserBoards);


// creating board api
app.post('/user/:id/addboards', boardapi.addUserBoard);


//get board by boardname
app.get('/user/:userId/board/:boardName', boardapi.getUserBoardBYBoardname);


// PUT update a board by userId and boardName
app.put('/user/:userId/board/:boardName', boardapi.updateBoardName);



// DELETE a board by userId and boardName
app.delete('/user/:userId/board/:boardName', boardapi.deleteBoard);


//TASKS

//Post the task


app.post('/board/:boardName/tasks',taskapi.createTask);



// PUT update a task for a board
app.put('/board/:boardName/tasks/:taskId', taskapi.updateTask);







// DELETE a task for a board
 app.delete('/board/:boardName/tasks/:taskId', taskapi.deleteTask);



// get all task of a board
app.get('/board/:boardName/tasks', taskapi.getTasks);


// gettting single task by id
app.get('/tasks/:taskId', taskapi.getTaskById);


app.post('/board/:boardId/addUsers', async (req, res) => {
  const { userId } = req.query;
  const { boardId } = req.params;
  const { users } = req.body;

  try {
    // Find the board by ID and check if the user has permission
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Check if the user has permission to modify the board
    if (board.createdBy !== userId) {
      return res.status(403).json({ error: 'User does not have permission to modify the board' });
    }

    // Add the users to the board
    for (const userId of users) {
      // Check if the user exists
      const user = await User.findById(userId);

      if (!user) {
        // User not found, skip and continue
        console.log(`User with ID ${userId} not found`);
        continue;
      }

      // Add the user to the board's list of members if not already added
      if (!board.members.includes(userId)) {
        board.members.push(userId);
      }
    }

    // Save the updated board
    await board.save();

    console.log('Users added to the board successfully');
    res.status(200).json({ message: 'Users added to the board successfully', board });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

