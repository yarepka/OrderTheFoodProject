const express = require("express");
const router = express.Router();

// models
const Product = require("../models/product");
const Cart = require('../models/cart');

router.get("/", (req, res, next) => {
  console.log("req.user in '/' route:" + req.user);
  console.log("req.session.cart '/'" + req.session.cart);
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

router.get("/add-to-cart/:id", (req, res, next) => {
  // we need to have cart object which will have products.
  // Cart object then will be stored in the session
  var productId = req.params.id;
  // check if we have Cart in the session
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect("/");
    }

    // add product to the cart
    cart.add(product, product.id);

    // storing cart object in the session
    // express-session will automatically
    // save with each response we send back
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/");
  });
});

router.get("/shopping-cart", (req, res, next) => {
  // check if there is cart for current session

  // no cart
  if (!req.session.cart) {
    return res.render("restaurant/shopping-cart", { products: null });
  }

  // cart exists
  var cart = new Cart(req.session.cart);
  // get items(products) of current cart
  var products = cart.generateArray();
  res.render("restaurant/shopping-cart", {
    products: products,
    totalPrice: cart.totalPrice,
  });
})

router.get("/remove/:id", (req, res, next) => {
  // we need to have cart object which will have products.
  var productId = req.params.id;
  // check if we have Cart in the session
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/reduce/:id", (req, res, next) => {
  // we need to have cart object which will have products.
  var productId = req.params.id;
  // check if we have Cart in the session
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/increase/:id", (req, res, next) => {
  // we need to have cart object which will have products.
  var productId = req.params.id;
  // check if we have Cart in the session
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.increaseByOne(productId);
  req.session.cart = cart;
  res.redirect("/shopping-cart");
});

router.get("/checkout", (req, res, next) => {
  res.render("restaurant/checkout");
});

module.exports = router;