const express = require("express");
// import express from "express"; es module
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();

//import routes
const useRoutes = require("./routes/user");

// app
const app = express();

// db
mongoose.connect(process.env.Database).then(() => console.log("DB connect"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use("/api", useRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
