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

// Food model
const Food = require("./models/Food");

function checkLocation(currentLocation, res, callback) {
  Location.find({}, (err, locations) => {
    if (!err) {
      if (locations.length > 0) {
        Location.findOne({ name: currentLocation }, (err, foundLocation) => {
          if (!err) {
            if (foundLocation) {
              callback({
                currentLocation: currentLocation,
                locations: locations,
                mainPhoto: "all",
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
}

app.get("/", (req, res) => {
  // finds the first location in the locations collection
  // this location will be set as a default when user
  // go to the "/" route
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

app.get("/addFood", (req, res) => {
  res.render("addFood");
});

app.get("/:location", (req, res) => {
  const currentLocation = _.startCase(_.toLower(req.params.location));
  res.redirect("/" + currentLocation + "/All");
});

app.get("/:location/:food", (req, res) => {
  const currentLocation = _.startCase(_.toLower(req.params.location));
  const currentFood = _.startCase(_.toLower(req.params.food));
  // check if location exists first
  checkLocation(currentLocation, res, (objReturned) => {
    Food.find({ type: currentFood })
      .limit(20)
      .exec((err, foundfood) => {
        if (!err) {
          if (foundfood.length > 0) {
            const food = [];
            foundfood.forEach((f) => {
              const newItem = {
                name: f.name,
                type: f.type,
                price: f.price,
                description: f.description,
                preparationTime: f.preparationTime,
                picture: _.camelCase(f.name),
              };
              food.push(newItem);
            });
            const temp = {
              currentLocation: objReturned.currentLocation,
              locations: objReturned.locations,
              mainPhoto: _.toLower(req.params.food),
              food: food,
            };
            res.render("index", temp);
          } else {
            console.log(currentFood + " type is not exists.");
            // Stub
            Food.find()
              .limit(20)
              .exec((err, food) => {
                if (!err) {
                  if (food.length > 0) {
                    const temp = {
                      currentLocation: objReturned.currentLocation,
                      locations: objReturned.locations,
                      mainPhoto: _.toLower(req.params.food),
                      food: food,
                    };
                    res.render("index", temp);
                  } else {
                    console.log("All type is not exists.");
                  }
                } else {
                  console.log("Error while finding All: " + err);
                }
              });
          }
        } else {
          console.log("Error while finding " + currentFood + ": " + err);
        }
      });
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

app.post("/addFood", (req, res) => {
  console.log(req.body);
  res.render("addFood");
  const newFood = new Food({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    description: req.body.description,
    preparationTime: req.body.preparationTime,
  });
  newFood.save();
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
