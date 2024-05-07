const express = require("express");
// import express from "express"; es module
const mongoose = require("mongoose");
require("dotenv").config();

//import routes
const useRoutes = require("./routes/user");

// app
const app = express();

// db
mongoose.connect(process.env.Database).then(() => console.log("DB connect"));

//routes middleware
app.use("/api", useRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
