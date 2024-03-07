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
    const user=await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }

    return res.json(user.boards);
} catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
}
});