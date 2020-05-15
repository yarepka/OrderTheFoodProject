const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const _ = require('lodash');

const Product = require("../models/product");
const User = require("../models/user");

// Set the storage engine
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let destination = "./public/img/";

    if (req.body.page === "update") {
      console.log(">>>UPDATE");
      if (req.body.type.trim() === "") {
        await Product.findOne({ _id: req.body.id }, (err, product) => {
          if (!err) {
            if (typeof (product) !== "undefined") {
              destination += _.camelCase(product.type[0]).trim();
            }
          }
        });
      } else {
        if (req.body.type.indexOf(",") === -1) {
          destination += _.camelCase(req.body.type).trim();
        } else {
          destination += _.camelCase(req.body.type.substring(0, req.body.type.indexOf(","))).trim();
        }
      }
    } else {
      if (req.body.type.indexOf(",") === -1) {
        destination += _.camelCase(req.body.type).trim();
      } else {
        destination += _.camelCase(req.body.type.substring(0, req.body.type.indexOf(","))).trim();
      }
    }

    destination += "/"

    cb(null, destination);
  },

  filename: async function (req, file, cb) {
    console.log("filename: " + _.camelCase(req.body.title) + path.extname(file.originalname));

    let fl;

    if (req.body.title.trim() === "" && req.body.page === "update") {
      await Product.findOne({ _id: req.body.id }, (err, product) => {
        fl = _.camelCase(product.title) + path.extname(file.originalname);
      });
    } else {
      fl = _.camelCase(req.body.title) + path.extname(file.originalname);
    }

    cb(null, fl);
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

router.post("/update-product", isAdmin, (req, res, next) => {
  upload(req, res, async (err) => {
    console.log(">>>REQ.BODY: ", req.body);
    if (err) {
      console.log("err: " + err);
      res.redirect("panel");
    } else {
      console.log(">>>Image Updated", req.file);
      await Product.findOne({ _id: req.body.id }, (err, product) => {
        if (!err) {
          if (req.body.title.trim() !== "") {
            product.title = req.body.title.trim();
          }

          if (req.body.description.trim() !== "") {
            product.description = req.body.description.trim();
          }

          if (req.body.price !== "") {
            product.price = req.body.price;
          }

          if (req.body.type.trim() !== "") {
            let types = [];
            types = req.body.type.split(",");
            types = types.map(type => {
              return type.trim();
            });
            product.type = types;
          }

          if (req.file !== undefined) {
            product.imagePath = "." + req.file.destination.substring(8, req.file.destination.length) + req.file.filename;
          } else {
            console.log(">>>Image Was Not Updated", req.file);
          }

          console.log(">>>UPDATED PRODUCT: ", product);
          product.save();

          res.redirect("panel");
        }
      })
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
  const page = req.body.page.trim();

  console.log(`{
    title: ${title},
    description: ${description},
    price: ${price},
    types: ${types},
    page: ${page}
  }`);

  if (page === "add" && (title === "" || description === "" || price === "" || types === "")) {
    cb("Error: Empty fields found");
  }

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}