const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
var path = require("path");
const expressLayouts = require("express-ejs-layouts");
// logging info about each request to console
var logger = require("morgan");
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/index");

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

// for form parameters access
app.use(express.urlencoded({ extended: false }));

// ORDER matters
app.use("/", indexRouter);

app.listen(PORT, console.log(`Server started on port ${PORT}`));

