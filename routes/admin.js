const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const _ = require('lodash');

const Product = require("../models/product");
const User = require("../models/user");

// Set the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = "./public/img/";
    if (req.body.type.indexOf(",") === -1) {
      destination += _.camelCase(req.body.type).trim();
    } else {
      destination += _.camelCase(req.body.type.substring(0, req.body.type.indexOf(","))).trim();
    }
    destination += "/"

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    console.log("filename: " + _.camelCase(req.body.title) + path.extname(file.originalname));
    cb(null, _.camelCase(req.body.title) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log("fileFilter title:" + req.body.title);
    validate(req, file, cb);
  }
}).single("productImage");

router.get("/panel", isAdmin, (req, res, next) => {
  console.log("User: ", req.user);
  console.log("IsAuthenticated: ", req.isAuthenticated());
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

router.get("/add-product", isAdmin, (req, res, next) => {
  res.render("admin/add-product");
});

router.get("/update-product/:id", isAdmin, (req, res, next) => {
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


router.post("/add-product", isAdmin, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("err: " + err);
      res.render("admin/add-product", { msg: err });
    } else {
      if (req.file === undefined) {
        console.log("err: No File Selected");
        res.render("admin/add-product", { msg: "No File Selected" });
      } else {
        console.log("body: ");
        console.log(req.body);
        console.log("file: ");
        console.log(req.file);

        // add new product 
        let types = [];
        types = req.body.type.split(",");
        types = types.map(type => {
          return type.trim();
        });
        console.log("splited: ", types);

        const newProduct = new Product({
          title: req.body.title.trim(),
          description: req.body.description.trim(),
          price: req.body.price.trim(),
          type: types,
          imagePath: "." + req.file.destination.substring(8, req.file.destination.length) + req.file.filename,
        });

        console.log("Product:");
        console.log(newProduct);

        // save new product to database
        newProduct.save();

        res.redirect("panel");
      }
    }
  })
});

router.post("/delete-product/:id", isAdmin, (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { $set: { isDeleted: true } }, (err, product) => {
    console.log("Deleted:", product);
    res.redirect("/admin/panel");
  });
});

router.post("/reset/:id", isAdmin, (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { $set: { isDeleted: false } }, (err, product) => {
    console.log("Reset:", product);
    res.redirect("/admin/panel");
  });
})

module.exports = router;

function isAdmin(req, res, next) {
  // is Authenticated
  if (req.isAuthenticated()) {
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (!err) {
        if (typeof (user) !== "undefined" && user !== null) {
          if (user.isAdmin) {
            console.log(`User: ${user} is admin.`)
            return next();
          } else {
            console.log(`User: ${user} is not admin`);
            res.redirect("/");
          }
        }
      } else {
        console.log(`Can't find user with ${user._id} id.`);
        res.redirect("/");
      }
    });
  } else {
    console.log(`User: ${req.user} is not authenticated`)
    res.redirect("/user/signin");
  }
}

// Check File Type
function validate(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  // Check if any of input fields are empty
  const title = req.body.title.trim();
  const description = req.body.description.trim();
  const price = req.body.price.trim();
  const types = req.body.type.trim();

  console.log(`{
    title: ${title},
    description: ${description},
    price: ${price},
    types: ${types},
  }`);

  if (title === "" || description === "" || price === "" || types === "") {
    cb("Error: Empty fields found");
  }

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}