const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.get("/panel", (req, res, next) => {
  Product.find({}, (err, products) => {
    if (!err) {
      if (products.length > 0) {
        res.render("admin/panel", { products: products });
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

module.exports = router;