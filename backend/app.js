const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("../backend/routes/authRoutes");

const app = express();
const cors=require("cors");

// middleware 
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes); // Register routes under '/api/auth'


mongoose.connect("mongodb+srv://admin:Cj1fYopndjY6fCmz@cluster0.z3zgd.mongodb.net/Travel?retryWrites=true&w=majority&appName=cluster0")
  .then(() => console.log("Connected to the database"))
  .then(() => {
    app.listen(5002, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
