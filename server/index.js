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



//get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    res.send({ status: "error", message: error.message });
  }
});


// Get user details by ID
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

// Update user details by ID
app.put('/user/:id', async (req, res) => {
    try {
        const { uname, email } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { uname, email }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
});







// Get user details by ID
app.get('/user/:id', async (req, res) => {
    try {
        const user = await UserDetails.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
});

// Update user details by ID
app.put('/user/:id', async (req, res) => {
    try {
        const { uname, email } = req.body;
        const user = await UserDetails.findByIdAndUpdate(req.params.id, { uname, email }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
});


require("./board");
const Board=mongoose.model("Board");

// Get all boards
app.get('/boards', async(req, res) => {
  try {
    const { name, isActive,columns } = req.body;
    const boards = await Board.findOne({name});
    
    res.send({ boards });
  } catch (error) {
    res.send({ status: "error", message: error.message });
  }
  });


// Get a single board by ID
app.get('/boards/:id', (req, res) => {
    Board.findById(req.params.id)
      .then(board => res.json(board))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Create a new board
app.post('/boards', (req, res) => {
    const newBoard = new Board(req.body.name);
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