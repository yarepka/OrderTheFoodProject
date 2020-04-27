var passport = require("passport");
var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;

// tells passport how to
// store the user in the session
passport.serializeUser((user, done) => {
  // whenever you want to store user in the session,
  // serialize it by id.
  done(null, user.id);
});

// retrive the user whenever i need it,
// throuh this stored(in the session) id.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// creating the user
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      // we want to tell this local passport package
      // that usernameField is "email" and passwordField
      // is "password"
      usernameField: "email",
      passwordField: "password",

      // req object will be past as a parameter
      // to the callback function below
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // validate passed parameters
      // checkBody is the function added by "validator"
      // 2nd param is the message will be printed in signup.hbs
      req.checkBody("email", "Invalid email").notEmpty().isEmail();
      req
        .checkBody("password", "Invalid password")
        .notEmpty()
        .isLength({ min: 6 });

      // check if any validation errors appears
      var errors = req.validationErrors();

      // if there are errors
      if (errors) {
        var messages = [];
        errors.forEach((error) => {
          messages.push(error.msg);
        });
        // we extract messages in index.js in "/user/signup" get
        // method and loop through this messages in the signup.hbs
        // view and show them to the user.
        return done(null, false, req.flash("error", messages));
      }

      // checking if user is already exists
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          // flash message will be stored in the session,
          // which can be outputed to the view
          // 1st param - no errors
          // 2nd param - no any retrived objects (telling that is is not succesfull)
          // 3rd param - flash message
          return done(null, false, { message: "Email is already in use." });
        }

        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, result) => {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      // we want to tell this local passport package
      // that usernameField is "email" and passwordField
      // is "password"
      usernameField: "email",
      passwordField: "password",

      // req object will be past as a parameter
      // to the callback function below
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // validate passed parameters
      // checkBody is the function added by "validator"
      // 2nd param is the message will be printed in signin.hbs
      req.checkBody("email", "Invalid email").notEmpty().isEmail();
      req.checkBody("password", "Invalid password").notEmpty();

      // check if any validation errors appears
      var errors = req.validationErrors();

      // if there are errors
      if (errors) {
        var messages = [];
        errors.forEach((error) => {
          messages.push(error.msg);
        });
        // we extract messages in user.js in "/user/signin" get
        // method and loop through this messages in the signin.ejs
        // view and show them to the user.
        return done(null, false, req.flash("error", messages));
      }

      // will try to find user
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          // flash message will be stored in the session,
          // which can be outputed to the view
          // 1st param - no errors
          // 2nd param - no any retrived objects (telling that is is not succesfull)
          // 3rd param - flash message
          return done(null, false, { message: "Email is not registered." });
        }

        if (!user.validPassword(password)) {
          // password is wrong
          return done(null, false, { message: "Wrong password." });
        }

        return done(null, user);
      });
    }
  )
);