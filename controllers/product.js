const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be upload",
      });
    }
    let product = new Product(fields);

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product
      .save()
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        console.log("There is an error below: ");
        console.log(err);
        return res.status(400).json({
          err: errorHandler(err),
        });
      });
  });
};
