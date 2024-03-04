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