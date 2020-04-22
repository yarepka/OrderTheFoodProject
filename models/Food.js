const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: [{ type: String, require: true }],
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  preparationTime: {
    type: Number,
    require: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
