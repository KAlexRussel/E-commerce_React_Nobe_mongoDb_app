const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log("err");
      console.log(err);
      return res.status(400).json({
        err: errorHandler(err),
      });
    });
};