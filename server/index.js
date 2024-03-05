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