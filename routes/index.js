const express = require("express");
const router = express.Router();

// models
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  // get 20 random products
  // check more on function: https://www.npmjs.com/package/mongoose-simple-random
  Product.findRandom({}, {}, { limit: 20 }, (err, products) => {
    if (!err) {
      if (products.length > 0) {
        res.render("restaurant/index", { products: products, mainImage: "img/types/all.jpg" });
      } else {
        console.log("Your products database is empty.");
      }
    } else {
      console.log("Error while finding all types products: " + err);
    }
  });
})

module.exports = router;