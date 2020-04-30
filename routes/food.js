const express = require("express");
const router = express.Router();
const _ = require('lodash');

// models
const Product = require("../models/product");

router.get("/:foodType", (req, res, next) => {
  let foodType = _.startCase(_.toLower(req.params.foodType));

  Product.find({ type: foodType }, (err, products) => {
    if (!err) {
      if (products.length > 0) {
        req.session.typeUrl = "/food/" + req.url;
        res.render("restaurant/index", { products: products, mainImage: "img/types/" + foodType + ".jpg" })
      } else {
        console.log("There is no items with '" + foodType + "' food type");
      }
    } else {
      console.log("Error while finding for ''" + foodType + "' foot type: " + err);
    }
  })
});

module.exports = router;