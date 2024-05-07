const express = require("express");
// import express from "express"; es module
const app = express();

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("hello from node");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
