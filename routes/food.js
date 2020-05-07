const express = require("express");
const router = express.Router();
const _ = require('lodash');

// models
const Product = require("../models/product");

router.get("/info/:id", (req, res, next) => {
  let id = req.params.id;
  Product.findOne({ _id: id }, (err, product) => {
    if (!err) {
      if (product) {
        req.session.typeUrl = "/food" + req.url;
        console.log("found the product: " + product);
        res.render("restaurant/info", { product: product });
      } else {
        console.log("Can't find the product with " + id + " id");
      }
    } else {
      console.log("Error while finding the product with " + id + " id: " + err);
    }
  });
});

router.get("/:foodType", (req, res, next) => {
  let foodType = _.startCase(_.toLower(req.params.foodType));

  Product.find({ type: foodType, isDeleted: false }, (err, products) => {
    if (!err) {
      if (typeof (products) !== "undefined" && products.length > 0) {
        req.session.typeUrl = "/food" + req.url;
        res.render("restaurant/index", { products: products, mainImage: "img/types/" + foodType + ".jpg" });
      } else {
        console.log("There is no items with '" + foodType + "' food type");
      }
    } else {
      console.log("Error while finding for ''" + foodType + "' foot type: " + err);
    }
  })
});
module.exports = router;