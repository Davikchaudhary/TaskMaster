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

require("./notification.js");
const Notification=mongoose.model("Notification");

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
      notifications:[],
    });

    // const newBoard = await Board.create({
    //   name: "Default Board",
    //   createdBy: newUser._id,
    //   columns: {
    //     todo: [],
    //     backlog: [],
    //     inProgress: [],
    //     completed: [],
    //   },
    // });

    // await newBoard.save();

    // newUser.boards.push(newBoard._id);
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


app.post('/board/:boardId/tasks',taskapi.createTask);



// PUT update a task for a board
app.put('/board/:boardId/tasks/:taskId', taskapi.updateTask);







// DELETE a task for a board
 app.delete('/board/:boardId/tasks/:taskId', taskapi.deleteTask);



// get all task of a board
app.get('/board/:boardId/tasks', taskapi.getTasks);


// gettting single task by id
app.get('/tasks/:taskId', taskapi.getTaskById);



app.post('/board/:boardId/addBoardToUsers', async (req, res) => {
  const { userId } = req.query;
  const { boardId } = req.params;
  const { userIds} = req.body;

  try {
    // Find the user by ID to ensure user exists and has permission
    const user = await User.findById(userId);
    const board=await Board.findById(boardId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has permission to modify boards
    // This can be customized based on your application's logic
    // if (board.createdBy!=userId) {
    //   return res.status(403).json({ error: 'User does not have permission to modify boards' });
    // }

    // Loop through each userId in the list
    for (const id of userIds) {
      // Find the user by their ID
      const targetUser = await User.findById(id);

      if (!targetUser) {
        // User not found, skip and continue
        console.log(`User with ID ${id} not found`);
        continue;
      }

      // Check if the boardId is already in the user's list of boards
      if (!targetUser.boards.includes(boardId)) {
        // Add the boardId to the user's list of boards
        targetUser.boards.push(boardId);
        await targetUser.save();
      }

      if (!board.members.includes(targetUser._id)) {
        board.members.push(targetUser._id);
        await board.save();
      }
    }
    
    await board.save();

    console.log('Board added to users successfully');
    res.status(200).json({ message: 'Board added to users successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


//ok

//get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/Boards', async (req, res) => {
  try {
    const users = await Board.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




// get boards for member field of a user

app.get('/user/:userId/boards', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filter boards where the user is a member
    const memberBoards = await Board.find({
      members: userId,
      createdBy: { $ne: userId } // Exclude boards created by the user
    })

    res.status(200).json({ memberBoards });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Notification Apis
app.post('/invite', async (req, res) => {
  const { senderId, receiverId, boardId } = req.body;

  try {
    // Find the sender, receiver, and board
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    const board = await Board.findById(boardId);

    if (!sender || !receiver || !board) {
      return res.status(404).json({ error: 'Sender, receiver, or board not found' });
    }

    // Create a new notification
    const newNotification = new Notification({
      sender: sender._id,
      receiver: receiver._id,
      board: board._id,
    });
    await newNotification.save();

    console.log(`Notification sent to user ${receiverId}`);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



//handle accept response
app.post('/notifications/:notificationId/accept', async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);
    const boardId=notification.board;
    const board=await Board.findById(boardId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.status = 'accepted';
    await notification.save();

    // Add the board to the receiver's list of boards
    const receiver = await User.findById(notification.receiver);
    if (receiver) {
      if (!receiver.boards.includes(notification.board)) {
        receiver.boards.push(notification.board);
        await receiver.save();
      }
    }

    console.log('Notification accepted:', notificationId);
    res.status(200).json({ message: 'Notification accepted successfully' });
  } catch (error) {
    console.error('Error accepting notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



//handle rejection
app.post('/notifications/:notificationId/reject', async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.status = 'rejected';
    await notification.save();

    console.log('Notification rejected:', notificationId);
    res.status(200).json({ message: 'Notification rejected successfully' });
  } catch (error) {
    console.error('Error rejecting notification:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// get users notifications
app.get('/notifications/pending/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find notifications where the user is the receiver and status is pending
    const notifications = await Notification.find({
      receiver: userId,
      status: 'pending'
    }).populate('sender', 'uname');

    res.status(200).json({ notifications });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
