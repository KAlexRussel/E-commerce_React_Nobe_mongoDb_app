const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
const { expressjwt: expressjwt } = require("express-jwt"); // for autorization check
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

exports.signin = (req, res) => {
  //find the user based on email
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user, err) => {
      if (err || !user) {
        return res.status(400).json({
          err: "User with that email does not exist. Please signup ",
        });
      }
      //if user is found make sure that email and passwords match
      //create authenticate method in user model
      if (!user.authenticate(password)) {
        return res.status(401).json({
          err: "Email and password do not match",
        });
      }

      //generate a signd token with user id and secret
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });

      // return response with user and token to frontend client
      const { _id, name, email, role } = user;

      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch((err) => console.log(err));
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  useProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!user) {
    return res.status(403).json({
      error: "access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "admin resource! Acces denied",
    });
  }
  next();
};
