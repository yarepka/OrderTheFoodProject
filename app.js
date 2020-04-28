const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
// logging info about each request to console
const logger = require("morgan");
// enable cookies
const cookieParser = require("cookie-parser");
const session = require("express-session");
// for messages like Invalid password, Invalid email, etc.
const flash = require("connect-flash");
// for authentication
const passport = require("passport");
// for email and password validation
const validator = require("express-validator");
// We are going to store our sessions
// in database for that we need
// "connect-mongo", we can also
// remove expired sessions from
// the database, we can specify
// the days after which session
// will be expired.
const MongoStore = require("connect-mongo")(session);

const PORT = process.env.PORT || 3000;

// routs
const indexRouter = require("./routes/index");
const foodRouter = require("./routes/food");
const userRouter = require("./routes/user");
require("./config/passport");

const app = express();

// DB config
const db = require("./config/keys").MongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error while connecting to databse: " + err));

// enables static files: .html, .css
app.use(express.static(path.join(__dirname, "public")));

// sets view engine as ejs
// set the default layout for all pages
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.use(logger("dev"));

// email and password validation
app.use(validator());

app.use(cookieParser());
app.use(
  session({
    secret: "mysupersecret",
    resave: false, // true - session will be saved on each request no matter something chaned or not
    saveUninitialized: false, // true - session will be stored on the server even it was not initialized
    // sessions will be stored in database (default LocalMemory)
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // set how long session can leave before it expire (minutes)
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use(flash());
app.use(passport.initialize());
// use session to store user
app.use(passport.session());

// for form parameters access
app.use(express.urlencoded({ extended: false }));

// Global variables
app.use((req, res, next) => {
  // we want to set the global variable "login"
  // which will be available in all views, which shows
  // if current user authenticated or not 
  // (for showin buttons in header.ejs)
  res.locals.login = req.isAuthenticated();

  // make session available in the views
  // (makes cart obj available in views)
  res.locals.session = req.session;
  next();
})

// ORDER matters
app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/", indexRouter);

app.listen(PORT, console.log(`Server started on port ${PORT}`));

