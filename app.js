const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const PORT = process.env.PORT || 3000;

const app = express();

// DB config
const db = require("./config/keys").MongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error while connecting to databse: " + err));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Location model
const Location = require("./models/Location");

app.get("/", (req, res) => {
  Location.findOne({}, (err, location) => {
    if (!err) {
      if (location) {
        const firstLocation = _.startCase(_.toLower(location.name));
        console.log("redirect to: /" + firstLocation);
        res.redirect("/" + firstLocation);
      } else {
        console.log("Locations collection is empty.");
      }
    } else {
      console.log("Error while finding for the first location. Error: " + err);
    }
  });
});

app.get("/addLocation", (req, res) => {
  res.render("addLocation");
});

app.get("/:location", (req, res) => {
  const currentLocation = _.startCase(_.toLower(req.params.location));
  console.log("CurrentLocation: " + currentLocation);

  // check if this location is exists
  Location.find({}, (err, locations) => {
    if (!err) {
      if (locations.length > 0) {
        Location.findOne({ name: currentLocation }, (err, foundLocation) => {
          if (!err) {
            if (foundLocation) {
              res.render("index", {
                currentLocation: currentLocation,
                locations: locations,
              });
            } else {
              console.log(
                "Location with " + currentLocation + " name was not found."
              );
              res.render("pageNotFound");
            }
          } else {
            console.log(
              "Error while finding location with " +
                currentLocation +
                " name. Error: " +
                err
            );
            res.render("pageNotFound");
          }
        });
      } else {
        console.log("Locations collection is empty");
      }
    } else {
      console.log("Error while finding locations: " + err);
    }
  });
});

app.post("/addLocation", (req, res) => {
  // if there is location with this name then not add it, otherwise add it
  const locationName = _.startCase(_.toLower(req.body.locationName));
  Location.find({ name: locationName }, (err, location) => {
    if (!err) {
      if (location.length === 0) {
        console.log("New location: " + locationName + " was added.");
        const newCity = new Location({
          name: locationName,
        });
        newCity.save();
      } else {
        console.log(location);
        console.log("Location with such name is already exists.");
      }
    } else {
      console.log(
        "Error while finding the location with " +
          locationName +
          "name. Error: " +
          err
      );
    }
  });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
