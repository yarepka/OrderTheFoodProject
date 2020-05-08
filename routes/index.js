const express = require("express");
const router = express.Router();

// models
const Product = require("../models/product");
const Cart = require('../models/cart');
const Order = require("../models/order");

router.get("/", (req, res, next) => {
  console.log("req.user in '/' route: " + req.user);
  console.log("req.session.cart '/': " + req.session.cart);
  // get 20 random products
  // check more on function: https://www.npmjs.com/package/mongoose-simple-random
  Product.findRandom({ isDeleted: false }, {}, { limit: 20 }, (err, products) => {
    if (!err) {
      if (typeof (products) !== "undefined" && products.length > 0) {
        req.session.typeUrl = req.url;
        res.render("restaurant/index", { products: products, mainImage: "img/types/all.jpg" });
      } else {
        console.log("Your products database is empty.");
      }
    } else {
      console.log("Error while finding all types products: " + err);
    }
  });

  // clean the shopping cart from the deleted objects
  if (typeof (req.session.cart) !== "undefined" && req.session.cart !== null) {
    let cart = new Cart(req.session.cart);
    console.log("cart: " + cart)
    cart.generateArray(req.session.cart);
    req.session.cart = cart;
  }
})

router.get("/add-to-cart/:id", (req, res, next) => {
  console.log("req.session.typeUrl: " + req.session.typeUrl);
  // we need to have cart object which will have products.
  // Cart object then will be stored in the session
  var productId = req.params.id;
  // check if we have Cart in the session
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect("/");
    }

    if (productId.isDeleted) {
      return res.redirect("/");
    }

    // add product to the cart
    cart.add(product, product.id);

    // storing cart object in the session
    // express-session will automatically
    // save with each response we send back
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect(req.session.typeUrl);
  });
});

router.get("/shopping-cart", (req, res, next) => {
  // check if there is cart for current session

  // no cart
  if (!req.session.cart) {
    return res.render("restaurant/shopping-cart", { products: null });
  }

  // cart exists
  const cart = new Cart(req.session.cart);
  // get items(products) of current cart
  // const products = cart.generateArray();
  // res.render("restaurant/shopping-cart", {
  //   products: products.reverse(),
  //   totalPrice: cart.totalPrice,
  // });
  const productsPromise = cart.generateArray(req.session.cart);

  productsPromise.then(function (result) {
    res.render("restaurant/shopping-cart", {
      products: result.reverse(),
      totalPrice: cart.totalPrice
    });
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

router.get("/checkout", isLoggedIn, (req, res, next) => {
  // check if there is cart for current session

  // no cart
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }

  // cart exists
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash("error")[0];
  res.render("restaurant/checkout", {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg,
  });
});

router.post("/checkout", isLoggedIn, (req, res, next) => {
  // check if there is cart for current session

  // no cart
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }

  // cart exists
  var cart = new Cart(req.session.cart);

  // var stripe = require("stripe")("sk_test_y1md8wv7EObszNHcbkfV6Ch400a9IXBDdE");

  var stripe = require("stripe")(process.env.SECRET_KEY);

  stripe.charges.create(
    {
      amount: Math.round(cart.totalPrice.toFixed(2) * 100), // cents
      currency: "usd",
      source: req.body.stripeToken,
      description: "Test Charge",
    },
    (err, charge) => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/checkout");
      }

      var order = new Order({
        // remember passport places user object on the request
        // and we are able to access it
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id,
      });

      order.save((err, result) => {
        // good practise to check for errors here
        req.flash("success", "Succesfully bought product!");
        req.session.cart = null;
        res.redirect("/shopping-cart");
      });
    }
  );
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // add new field = url which user tried to access (checkout)
  req.session.oldUrl = req.url;
  res.redirect("/user/signin");
}