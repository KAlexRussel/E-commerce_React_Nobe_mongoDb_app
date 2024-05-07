const User = require("../models/user");

exports.signup = (req, res) => {
  // console.log("req.body", req.body);
  const user = new User(req.body);

  // new way to save users in mongodb
  user
    .save()
    .then((user) => {
      console.log("user registeredv please");
      res.json({
        user,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        err,
      });
    });
};
