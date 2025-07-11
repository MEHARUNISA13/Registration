const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // ✅ LOAD .env FILE

const app = express();
const PORT = process.env.PORT || 5000;
const Mongo_ur = process.env.MONGO_URI; // ✅ USE FROM .env

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


const db = mongoose.connection;
db.on("error", (error) => {
  console.error("❌ MongoDB connection error:", error);
});
db.once('open', () => {
  console.log('✅ Connected to MongoDB Atlas');
});

// Schema + Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Route
app.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
