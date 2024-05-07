const express = require("express");
// import express from "express"; es module
const mongoose = require("mongoose");
require("dotenv").config();

// app
const app = express();

// db
mongoose.connect(process.env.Database).then(() => console.log("DB connect"));

app.get("/", (req, res) => {
  res.send("hello from node update");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
