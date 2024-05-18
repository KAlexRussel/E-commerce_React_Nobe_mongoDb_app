const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    // console.log("this are the fields");
    // console.log(fields);

    if (err) {
      return res.status(400).json({
        error: "Image could not be upload",
      });
    }

    // Ensure fields are in the correct format
    const name = fields.name && fields.name[0];
    const description = fields.description && fields.description[0];
    const price = fields.price && parseFloat(fields.price[0]);
    const quantity = fields.quantity && parseInt(fields.quantity[0]);
    const shipping = fields.shipping && fields.shipping[0] === "true";
    // const category = fields.category && fields.category[0];
    // console.log("this is the categiry id");
    // console.log(category);

    if (
      !name ||
      !description ||
      isNaN(price) ||
      isNaN(quantity) ||
      typeof shipping !== "boolean"
    ) {
      return res.status(400).json({
        error: "Invalid input format",
      });
    }

    if (!fields.category || !fields.category[0]) {
      return res.status(400).json({
        error: "Category is required",
      });
    }

    // Create a new Product object
    let product = new Product({
      name,
      description,
      price,
      quantity,
      category: fields.category[0],
      shipping,
    });

    // let product = new Product(fields);

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo[0].filepath);
      //   product.photo.contentType = files.photo.type;
      product.photo.contentType = files.photo[0].mimetype;
    }
    console.log("type");
    console.log(files.photo[0].mimetype);

    product
      .save()
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        console.log("this is the error: ");
        console.log(err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      });
  });
};
