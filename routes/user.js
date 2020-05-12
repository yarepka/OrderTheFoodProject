const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const passport = require("passport");

const Order = require("../models/order");
const Cart = require("../models/cart");

let csrfProtection = csrf();

router.use(csrfProtection);

router.get("/profile", isLoggedIn, (req, res, next) => {
  // retrive the order data
  // remember passport stores
  // the logged in user data
  // on the request
  Order.find({ user: req.user }, (err, orders) => {
    if (err) {
      // error handling should be here
      return res.write("Error!");
    }

    if (orders.length === 0) {
      console.log("No orders");
      res.render("user/profile", { orders: null });
    }

    let cart;

    let orderPromise = new Promise((resolve, reject) => {
      console.log("PROFILE: inside orderPromise");
      orders.forEach(async (order, index, array) => {
        console.log(`PROFILE: inside forEach, order: ${order}, index: ${index}`);
        cart = new Cart(order.cart);
        order.items = await cart.generateArray();
        if (index === array.length - 1) {
          console.log("PROFILE: before oderPromise resolve");
          resolve();
        }
      });
    });

    orderPromise.then(() => {
      console.log("PROFILE: orderPromise.then(), before rendering");
      res.render("user/profile", { orders: orders.reverse() });
    })
  });
});

router.get("/logout", (req, res, next) => {
  // method added by passport
  req.logout();
  res.redirect("/");
});

// place it in front off all the routes where
// we want to check if they are not logged in
// the routes where we want to check if the user
// is logged in should be placed before this use
router.use("/", notLoggedIn, (req, res, next) => {
  next();
});

router.get("/signin", (req, res, next) => {
  // get messages stored in request through flash package
  let messages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.get("/signup", (req, res, next) => {
  let messages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

/*
  The express-session sends a token to the app,
  which then will be sent with every request
  from the browser and then will be compared
  with the secret by the csurf
*/
router.post(
  "/signup",
  passport.authenticate("local.signup", {
    failureRedirect: "/user/signup",
    failureFlash: true,
  }),
  (req, res, next) => {
    // will be called if no failure
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/user/profile");
    }
  }
);

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    failureRedirect: "/user/signin",
    failureFlash: true,
  }),
  (req, res, next) => {
    // will be called if no failure
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/user/profile");
    }
  }
);

module.exports = router;

// protecting route,
// so that we can access routes only if we logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}