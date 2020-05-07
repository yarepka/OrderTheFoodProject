const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const _ = require('lodash');

const Product = require("../models/product");

// Set the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("destination:" + "../public/img/" + req.body.type.substring(0, req.body.type.indexOf(",")).toLowerCase() + "/");
    cb(null, "./public/img/" + req.body.type.substring(0, req.body.type.indexOf(",")).toLowerCase() + "/");
  },
  filename: function (req, file, cb) {
    console.log("filename: " + _.camelCase(req.body.title) + path.extname(file.originalname));
    cb(null, _.camelCase(req.body.title) + path.extname(file.originalname));

    // cb(null, file.fieldname + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log("fileFilter title:" + req.body.title);
    validate(req, file, cb);
  }
}).single("productImage");

router.get("/panel", (req, res, next) => {
  Product.find({}, (err, products) => {
    if (!err) {
      if (products.length > 0) {
        res.render("admin/panel", { products: products.reverse() });
      } else {
        console.log("Products collection is empty");
      }
    } else {
      console.log(`Error while trying to get products from Database ${err}`);
    }
  });

});

router.get("/add-product", (req, res, next) => {
  res.render("admin/add-product");
});

router.get("/update-product/:id", (req, res, next) => {
  let id = req.params.id;
  Product.findOne({ _id: id }, (err, product) => {
    if (!err) {
      if (typeof (product) !== "undefined") {
        res.render("admin/update-product", { product: product });
      }
    } else {
      console.log(`Error while finding the product with ${id} id: ${error}`);
    }
  })
});


router.post("/add-product", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("err: " + err);
    } else {
      if (req.file === undefined) {
        console.log("err: No File Selected!");
      } else {
        console.log("file was uploaded!");
      }
    }
  })
});

module.exports = router;

// Check File Type
function validate(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  // Check if any of input fields are empty
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const types = req.body.type;

  console.log(`{
    title: ${title},
    description: ${description},
    price: ${price},
    types: ${types},
  }`);

  if (title === "" || description === "" || price === "" || types === "") {
    cb("Not all fields were entered");
  }

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}