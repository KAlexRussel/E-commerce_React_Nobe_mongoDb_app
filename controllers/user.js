const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  // console.log("req.body", req.body);
  const user = new User(req.body);

  // new way to save users in mongodb
  user
    .save()
    .then((user) => {
      console.log("user registered successfully");
      user.salt = undefined; // make it invisible if me request for it to postman
      user.hashed_password = undefined;
      res.json({
        user,
      });
    })
    .catch((err) => {
    //   console.log(err);
      return res.status(400).json({
        err: errorHandler(err),
      });
    });
};
