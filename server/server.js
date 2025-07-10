const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const PORT=5000;
const app=express()
const Mongo_ur="mongodb://127.0.0.1:27017/test";



//middlewares
app.use(cors());
app.use(express.json());
mongoose.connect(Mongo_ur);
const db=mongoose.connection;
db.on("error", (error) => {console.error("Mongo DB connection error:", error);})
db.once('open', () => {console.log('Connected to MongoDB');});
//creating schema
const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
//creating model
const User=mongoose.model('User', userSchema);
app.post('/register',async(req,res)=>{
  try{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const savedUser=await newUser.save(); 
    res.status(200).json(savedUser)
  }
  catch(error){
  console.error('Error registering user:', error);
  res.status(500).json({ error: "Internal Server error" });
  }
});
app.listen(PORT)